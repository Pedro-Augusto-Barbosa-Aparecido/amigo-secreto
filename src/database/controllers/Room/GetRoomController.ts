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
}
