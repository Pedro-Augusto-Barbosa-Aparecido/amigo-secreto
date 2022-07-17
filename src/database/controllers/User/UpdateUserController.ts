import prismaClient from "../../../utils/client";

export default class UpdateUserController {
    updateAvatar = async (avatarUrl: string, id: string) => {
        try {
            await prismaClient.user.update({
                where: {
                    id
                },
                data: {
                    avatarUrl
                }
            });

            return {
                success: true
            }

        } catch (err) {
            return {
                success: false,
                err
            }
        }

    } 
    
}
