import { NextApiRequest, NextApiResponse } from "next";
import GetUserController from "../../../../database/controllers/User/GetUserController";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const userController = new GetUserController();
    const { email } = req.body;

    const user = await userController.get({ email });

    if (user.user)
        return res.send({ userNotExist: true });
    
    return res.send({ userNotExist: false });

}
