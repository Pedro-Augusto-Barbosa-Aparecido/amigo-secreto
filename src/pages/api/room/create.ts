import { NextApiRequest, NextApiResponse } from "next";
import RoomCreateController from "../../../database/controllers/CreateRoom";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const roomCreator = new RoomCreateController();

    const { room, person } = req.body;

    const roomCreated = await roomCreator.create(room, person);

    if (!roomCreated) 
        res.status(500).send({ msg: "Não foi possivel criar a sala." });

    res.status(201).send({
        msg: "Sala criada com sucesso",
        room: roomCreated
    });

}
