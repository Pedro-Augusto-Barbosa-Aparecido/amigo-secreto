import prismaClient from "../../../utils/client";

export type UserDelete = {
    email: string
}

export type UserDeleteReturn = {
    userNotExist?: boolean
    msg: string
    err?: any

}

export default class DeleteUserController {
    async delete (user: UserDelete): Promise<UserDeleteReturn> {
        try {
            const __user = await prismaClient.user.findFirst({
                where: {
                    email: user.email
                }
            });

            if (!!__user) 
                return {
                    userNotExist: true,
                    msg: `User with email: ${user.email} not exist!`
                }

            await prismaClient.user.delete({
                where: {
                    email: user.email
                }
            });

            return {
                userNotExist: false,
                msg: "User was deleted with success!"
            }

        } catch (err) {
            return {
                err,
                msg: "Occurred an error on delete user"
            }
        }

    }
}
