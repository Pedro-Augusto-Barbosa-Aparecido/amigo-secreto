import { NextApiRequest, NextApiResponse } from "next";
import DeleteRoomController from "../../../database/controllers/rooms/DeleteRoomController";
import GetRoomController from "../../../database/controllers/rooms/GetRoomController";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const deleter = new DeleteRoomController();
    const getterRoom = new GetRoomController();
    const { room, emailUser } = req.body;    
    
    if (!(await getterRoom.verifyEmailIsAdmin(room, emailUser))) 
        return res.status(400).send({
            msg: "Você não tem permissão para deletar essa sala"
        });

    const _room = await deleter.delete(room);
    
    if (!_room)
        return res.status(500).send({ 
            msg: `Não foi possivel deletar a sala ${room}`
        });

    return res.send({
        msg: `Room ${room} foi deletada com sucesso`
    });

}
