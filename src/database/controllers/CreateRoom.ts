import prismaClient from "../../utils/client";
import { People, Room } from "../../utils/types";

class RoomCreateController {
    async create (room: Room, person: People) {
        const _person = await prismaClient.people.findFirst({
            where: {
                email: person.email
            }
        });
        
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
