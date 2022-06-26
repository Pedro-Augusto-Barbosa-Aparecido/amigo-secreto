import { NextApiRequest, NextApiResponse } from "next";
import UpdateRoomController from "../../../database/controllers/rooms/UpdateRoomController";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { roomName, person } = req.body;
    const updater = new UpdateRoomController();

    const room = await updater.addPerson(roomName, person);

    if (!room) 
        return res.status(500).send({
            msg: `Não foi possivel adicionar a pessoa [${person.name}|${person.email}]`
        });

    return res.send({
        msg: `Pessoa ${person.email} foi adicionada a ${roomName}`
    });

}
