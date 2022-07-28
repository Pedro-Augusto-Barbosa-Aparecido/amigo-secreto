import { NextApiRequest, NextApiResponse } from "next";
import { createTransport } from "nodemailer";

import GetRoomController from "../../../database/controllers/Room/GetRoomController";

import hbs from "nodemailer-express-handlebars";
import path from "path";
// import { sorter } from "../../utils/sorter";
import GetUserController from "../../../database/controllers/User/GetUserController";
import { sorter } from "../../../utils/sorter";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { room } = req.body;
    const roomGetter = new GetRoomController();

    const _room = await roomGetter.getById(room);

    if (!_room)
        return res.status(404).send({
            msg: `Sala ${room} não foi encontrada`
        });

    // if (emailUser !== _room.createdBy)
    //     return res.status(403).send({
    //         msg: `Você não tem permissão para acessar a sala ${room}`
    //     });

    // const user = await (new GetPeopleController()).get(_room.createdBy);

    const transporter = createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_ADMIN,
            pass: process.env.PASSWORD
        }

    });

    transporter.use("compile", hbs({
        viewEngine: {
            extname: ".html",
            partialsDir: path.resolve("./src/emails/resources/"),
            defaultLayout: false
        },
        viewPath: path.resolve("./src/emails/resources/"),
        extName: ".html"
    }));

    const emailsSuccess: Array<string> = [];
    const emailsFaileds: Array<string> = [];

    if (!_room._room || !_room._room.createdBy)
        return res.send({ err: "Erro ao realizar o sorteio" });

    const peoples = sorter([..._room._room?.people || [], _room._room?.createdBy]);

    try {
        await peoples.forEach(async (person, index) => {
            if (index === (peoples.length - 1))
                var friend = peoples[0];
            else
                var friend = peoples[index + 1];
    
            var emailOptions = {
                from: process.env.EMAIL_ADMIN,
                to: person.email,
                subject: `Resultado do sorteio do amigo secreto da sala ${room}`,
                template: "email",
                context: {
                    name: person.name,
                    friend: friend.name,
                    room: _room._room.name,
                    url: `https://konan.vercel.app/room/result/${friend.id}`
                }
            }
    
            await transporter.sendMail(emailOptions, (err, info) => {
                if (err) { 
                    console.log(err);
                    emailsFaileds.push(person.email);
    
                }
                else {
                    emailsSuccess.push(person.email)
    
                }
            });
    
        });
    } catch(err) {
        console.log(err);
        return res.status(500).send({err})

    }
    
    return res.send({
        success: emailsSuccess,
        faileds: emailsFaileds 
    })

}

export default handler;
