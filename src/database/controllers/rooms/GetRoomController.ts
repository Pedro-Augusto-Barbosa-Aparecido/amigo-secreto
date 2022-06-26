import prismaClient from "../../../utils/client";

export default class GetRoomController {
    async verifyEmailIsAdmin(room: string, emailUser: string) {
        try {
            const _room = await prismaClient.room.findFirst({
                where: {
                    name: room,
                    createdBy: emailUser
                }
            });

            if (!_room)
                return null;

            return _room;

        } catch (err) {
            return null;
        }
    }

    async getList(emailUser: string) {
        try {
            const rooms = await prismaClient.room.findMany({
                where: {
                    createdBy: emailUser
                },
                select: {
                    name: true,
                    createdBy: true,
                    createdAt: true,
                    people: true
                }
            });

            return rooms;

        } catch(err) {
            return null;
        }

    } 

    async get(room: string) {
        const _room = await prismaClient.room.findFirst({
            where: {
                name: room
            },
            select: {
                createdBy: true,
                people: true,
                name: true
            }
        });

        if (!_room)
            return null;

        return _room;

    }

}
