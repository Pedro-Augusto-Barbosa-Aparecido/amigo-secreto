import prismaClient from "../../../utils/client";

export default class GetPersonController {
    async getById (personId: string) {
        try {
            const person = await prismaClient.people.findUnique({
                where: {
                    id: personId
                }, 
                select: {
                    name: true,
                    room: true
                }
            });

            if (!person) 
                return {
                    notExist: true
                }

            return {
                notExist: false,
                person
            }

        } catch (err) {
            return {
                err
            }
        }

    }
    
}
