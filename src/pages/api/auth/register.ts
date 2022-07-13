import { NextApiRequest, NextApiResponse } from "next";
import CreateUserController from "../../../database/controllers/User/CreateUserController";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST")
        return res.status(401).send({
            msg: "This method is not allowed!"
        });

    const { name, email, password } = req.body; 
    const userController = new CreateUserController();
    const _user = await userController.create({ name, email, password });

    return res.status(201).send(_user);

}
