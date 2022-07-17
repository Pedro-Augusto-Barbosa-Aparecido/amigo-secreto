import { NextApiRequest, NextApiResponse } from "next";
import UpdateUserController from "../../../../database/controllers/User/UpdateUserController";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { newPassword, userId } = req.body;
    const userController = new UpdateUserController();

    const resp = await userController.updatePassword(userId, newPassword);

    return res.send(resp);


}
