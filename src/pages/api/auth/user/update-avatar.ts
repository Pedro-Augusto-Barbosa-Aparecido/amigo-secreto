import { NextApiRequest, NextApiResponse } from "next";
import UpdateUserController from "../../../../database/controllers/User/UpdateUserController";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const userController = new UpdateUserController();
    const { avatarUrl, userId } = req.body;
    const resp = await userController.updateAvatar(avatarUrl, userId);

    return res.send(resp);

}
