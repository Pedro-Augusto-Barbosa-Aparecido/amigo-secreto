import { NextApiRequest, NextApiResponse } from "next";
import { createTransport } from "nodemailer";

import GetRoomController from "../../database/controllers/rooms/GetRoomController";

import hbs from "nodemailer-express-handlebars";
import path from "path";
import GetUserController from "../../database/controllers/users/GetUsersController";
import { sorter } from "../../utils/sorter";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { room, subtitle } = req.body;
    const roomGetter = new GetRoomController();

    const _room = await roomGetter.get(room);

    if (!_room)
        return res.status(404).send({
            msg: `Sala ${room} não foi encontrada`
        });

    const user = await (new GetUserController()).get(_room.createdBy);

    const transporter = createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
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

    const peoples = sorter(_room.people);

    peoples.forEach(async (person, index) => {
        var emailOptions = {
            from: subtitle,
            to: person.email,
            subject: `Resultado do sorteio do amigo secreto da sala ${room}`,
            template: "email",
            context: {
                name: person.name,
                friend: "Pedro Augusto",
                room: _room.name,
                created: user?.name
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
    
    return res.send({
        success: emailsSuccess,
        faileds: emailsFaileds 
    })

}

export default handler;
