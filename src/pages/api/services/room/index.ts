import { NextApiRequest, NextApiResponse } from "next";
import GetRoomController from "../../../../database/controllers/Room/GetRoomController";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { email, userId } = req.body;
    const roomController = new GetRoomController();

    const result = await roomController.getList(email, userId);

    return res.send(result);

}
