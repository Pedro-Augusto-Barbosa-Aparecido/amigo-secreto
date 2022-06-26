import prismaClient from "../../../utils/client";

export default class DeleteRoomController {
    async delete(room: string) {
        const _room = await prismaClient.room.findFirst({
            where: {
                name: room
            }
        });

        if (!_room)
            return null;

        try {
            const __room = await prismaClient.room.delete({
                where: {
                    name: room
                },
                select: {
                    name: true,
                }
            });
    
            return __room;
        } catch (err) {
            return null;
        }

    }

}
