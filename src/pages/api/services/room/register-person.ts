import { NextApiResponse, NextApiRequest } from 'next';
import UpdateRoomController from '../../../../database/controllers/Room/UpdateRoomController';

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { person, room } = req.body;
    const roomController = new UpdateRoomController();

    const resp = await roomController.registerPerson({ ...person, roomToAssign: room });

    return res.send(resp);

}