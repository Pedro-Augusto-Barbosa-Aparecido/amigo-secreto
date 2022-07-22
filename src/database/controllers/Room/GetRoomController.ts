import prismaClient from "../../../utils/client";

export default class GetRoomController {
    async searchByName (name: string) {
        try {
            const room = await prismaClient.room.findUnique({ 
                where: {
                    name: name
                }
            });

            if (!room)
                return {
                    notExist: true
                }

            return {
                notExist: false
            }

        } catch (err) {
            return {
                err

            }

        }   

    }

    async getList (userEmail: string, userId: string) {
        try {
            const rooms = await prismaClient.room.findMany({
                where: {
                    OR: {
                        createdBy: userId,
                        people: {
                            every: {
                                email: userEmail
                            }
                        }
                    }
                },
                select: {
                    name: true,
                    id: true,
                    roomType: true,
                    sorterDate: true
                }
            });

            return {
                success: true,
                rooms,
                total: rooms.length
            }

        } catch (err) {
            return {
                success: false,
                rooms: [],
                total: 0,
                err

            }

        }

    }

}
