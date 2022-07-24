import prismaClient from "../../../utils/client";

interface IPersonParam {
    name: string
    email: string
    roomToAssign: string 

}

export default class UpdateRoomController {
    async registerPerson (person: IPersonParam) {
        try {
            await prismaClient.room.update({
                where: {
                    id: person.roomToAssign,
                },
                data: {
                    people: {
                        create: {
                            name: person.name,
                            email: person.email
                        }
                    }
                }
            });

            return {
                sucess: true
            }

        } catch (err) {
            return {
                sucess: false,
                err

            }

        }

    }
    
}
