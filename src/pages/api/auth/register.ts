import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import CreateUserController from "../../../database/controllers/User/CreateUserController";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST")
        return res.status(401).send({
            msg: "This method is not allowed!"
        });

    const { name, email, password } = req.body; 
    const userController = new CreateUserController();
    const _user = await userController.create({ name, email, password, avatarUrl: "" });

    if (_user.err)
        return res.status(500).send({ msg: "Erro ao criar usuário" });

    if (_user.alreadyExist)
        return res.status(302).send({ msg: "Usuário já existe com esse e-mail!" });

    const token = sign({}, process.env.TOKEN_KEY || "", { subject: _user.user?.id, expiresIn: `${60 * 60 * 24 * 1}d` });

    return res.status(201).send({ user: { ..._user.user }, token });

}
