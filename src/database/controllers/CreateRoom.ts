import prismaClient from "../../utils/client";
import { People, Room } from "../../utils/types";

class RoomCreateController {
    async create (room: Room, person: People) {
        const _room = await prismaClient.room.findFirst({
            where: {
                name: room.name
            }
        });

        if (_room)
            return null;
        
        const roomCreated = await prismaClient.room.create({
            data: {
                name: room.name,
                people: {
                    connectOrCreate: {
                        create: {
                            name: person.name,
                            email: person.email
                        }, 
                        where: {
                            // @ts-ignore
                            email: person.email
                        }
                    }
                },
                createdBy: room.createdBy
                
            },
            select: {
                name: true,
                createdBy: true,
                createdAt: true
            }
        });

        return roomCreated;

    }

}

export default RoomCreateController;
