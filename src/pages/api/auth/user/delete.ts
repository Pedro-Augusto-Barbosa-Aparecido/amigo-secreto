import { NextApiRequest, NextApiResponse } from "next";
import DeleteUserController from "../../../../database/controllers/User/DeleteUserController";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST")
        return res.status(401).send({
            msg: "This method is not allowed!"
        });

    const { email } = req.body; 

    const userController = new DeleteUserController();
    const _user = await userController.delete({ email });

    return res.status(201).send(_user);

}
