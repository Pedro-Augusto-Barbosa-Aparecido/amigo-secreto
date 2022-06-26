import prismaClient from "../../../utils/client";

export default class GetUserController {
    async get(email: string) {
        try {
            const user = await prismaClient.people.findFirst({
                where: {
                    email
                }, select: {
                    email: true, 
                    name: true
                }
            });

            if (!user)
                return null;

            return user;

        } catch (err) {
            return null;
        }

    }

}
