import prismaClient from "../../../utils/client";

export type UserGet = {
    email?: string
    id?: string,
    name?: string

}

export type User = {
    name: string
    id?: string
    email: string
}

export type UserGetReturn = {
    userNotExist?: boolean
    msg: string
    user?: User | undefined | null
    err?: any

}

export default class GetUserController {
    async get (user: UserGet): Promise<UserGetReturn> {
        try {
            const _user = await prismaClient.user.findFirst({
                where: {
                    id: user.id,
                    email: user.email
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            });

            if (!!_user)
                return {
                    userNotExist: true,
                    msg: "User not found with success!"

                }

            return {
                userNotExist: false,
                user: _user,
                msg: "User found with success!"

            }

        } catch (err) {
            return {
                err,
                msg: "Occurred an error on search user specified!"

            }

        }
    }
}
