import { NextApiRequest, NextApiResponse } from "next";
import { createTransport } from "nodemailer";
import hbs, { NodemailerExpressHandlebarsOptions } from "nodemailer-express-handlebars";
import path from "path";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { room } = req.body;

    const transporter = createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "pedro007augustobarbosa@gmail.com",
            pass: "foqipjkagjkngsfp"
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

    const emailOptions = {
        from: "Amigo Secreto R&D",
        to: "pbarbosaaparecido@gmail.com",
        subject: "Teste de email",
        template: "email",
        context: {
            name: "Pedro Augusto",
            friend: "Pedro Augusto",
            room: ""
        }
    }

    const response = await transporter.sendMail(emailOptions, (err, info) => {
        if (err) {
            res.status(500).send({
                msg: "Erro ao enviar o email"
            });
        } else {
            res.status(200).send({ msg: "Email enviado com sucesso" });
        }
    });

}

export default handler;
