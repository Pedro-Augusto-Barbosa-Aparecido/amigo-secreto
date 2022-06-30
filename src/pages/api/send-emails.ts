import { NextApiRequest, NextApiResponse } from "next";
// import { createTransport } from "nodemailer";

// import GetRoomController from "../../database/controllers/rooms/GetRoomController";

// import hbs from "nodemailer-express-handlebars";
// import path from "path";
// import GetPeopleController from "../../database/controllers/people/GetPeopleController";
// import { sorter } from "../../utils/sorter";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // const { room, subtitle, emailUser } = req.body;
    // const roomGetter = new GetRoomController();

    // const _room = await roomGetter.get(room);

    // if (!_room)
    //     return res.status(404).send({
    //         msg: `Sala ${room} não foi encontrada`
    //     });

    // if (emailUser !== _room.createdBy)
    //     return res.status(403).send({
    //         msg: `Você não tem permissão para acessar a sala ${room}`
    //     });

    // const user = await (new GetPeopleController()).get(_room.createdBy);

    // const transporter = createTransport({
    //     host: "smtp.gmail.com",
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: process.env.EMAIL_ADMIN,
    //         pass: process.env.PASSWORD
    //     }

    // });

    // transporter.use("compile", hbs({
    //     viewEngine: {
    //         extname: ".html",
    //         partialsDir: path.resolve("./src/emails/resources/"),
    //         defaultLayout: false
    //     },
    //     viewPath: path.resolve("./src/emails/resources/"),
    //     extName: ".html"
    // }));

    // const emailsSuccess: Array<string> = [];
    // const emailsFaileds: Array<string> = [];

    // const peoples = sorter(_room.people);

    // await peoples.forEach(async (person, index) => {
    //     if (index === (peoples.length - 1))
    //         var friend = peoples[0];
    //     else
    //         var friend = peoples[index + 1];

    //     var emailOptions = {
    //         from: subtitle,
    //         to: person.email,
    //         subject: `Resultado do sorteio do amigo secreto da sala ${room}`,
    //         template: "email",
    //         context: {
    //             name: person.name,
    //             friend: friend.name,
    //             room: _room.name,
    //             created: user?.name
    //         }
    //     }

    //     await transporter.sendMail(emailOptions, (err, info) => {
    //         if (err) { 
    //             console.log(err);
    //             emailsFaileds.push(person.email);

    //         }
    //         else {
    //             emailsSuccess.push(person.email)

    //         }
    //     });

    // });
    
    // return res.send({
    //     success: emailsSuccess,
    //     faileds: emailsFaileds 
    // })

    res.send({ name: "Jhoe" })

}

export default handler;
