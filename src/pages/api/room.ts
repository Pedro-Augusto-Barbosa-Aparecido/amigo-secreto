import { NextApiRequest, NextApiResponse } from "next";
import GetRoomController from "../../database/controllers/rooms/GetRoomController";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const getter = new GetRoomController();
    const { emailUser } = req.body;

    const rooms = await getter.getList(emailUser);

    return res.send({
        data: rooms
    });
    
}
