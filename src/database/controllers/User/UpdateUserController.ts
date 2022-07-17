import bcrypt from 'bcryptjs';
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

    updatePassword = async (id: string, newPassword: string) => {
        try {
            const hash = await bcrypt.hash(newPassword, 10);

            await prismaClient.user.update({
                where: {
                    id
                },
                data: {
                    password: hash
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
