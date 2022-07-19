import { NextApiRequest, NextApiResponse } from "next";
import CreateRoomController from "../../../../database/controllers/Room/CreateRoomController";
import GetRoomController from "../../../../database/controllers/Room/GetRoomController";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { room } = req.body;
    const userController = new CreateRoomController();
    const getRoomController = new GetRoomController();

    const __room = await getRoomController.searchByName(room.roomName);
    
    if (!__room.notExist)
        return res.send({
            roomAlreadyExist: true
        });

    const _room = await userController.create(room);
    console.log(_room)
    return res.send({
        ..._room,
        roomAlreadyExist: false
    });

}
