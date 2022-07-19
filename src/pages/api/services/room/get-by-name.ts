import { NextApiRequest, NextApiResponse } from "next";
import GetRoomController from "../../../../database/controllers/Room/GetRoomController";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    // const { roomName } = req.body;
    // const roomController = new GetRoomController();
    return res.send({ name: "Jhon Doe" })

}
