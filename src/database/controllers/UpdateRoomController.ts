import prismaClient from "../../utils/client";
import { People } from "../../utils/types";


export default class UpdateRoomController {
    async addPerson (room: string, person: People) {
        const _room = await prismaClient.room.findFirst({
            where: {
                name: room
            }
        });

        if (!_room)
            return null;

        try {
            const _roomWithNewPerson = await prismaClient.room.update({
                where: {
                    name: room
                },
                data: {
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
                    }
                }
            });
    
            return _roomWithNewPerson;

        } catch (err) {
            return null;
            
        }

    }

}
