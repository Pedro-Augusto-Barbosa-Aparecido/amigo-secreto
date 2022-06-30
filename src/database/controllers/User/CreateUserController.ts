import prismaClient from "../../../utils/client";
import { User } from "./GetUserController";

export type UserCreate = {
    name: string
    email: string

}

export type UserCreateReturn = {
    alreadyExist?: boolean
    msg: string
    user?: User | undefined | null
    err?: any

}

export default class CreateUserController {
    async create(user: UserCreate): Promise<UserCreateReturn> {
        try {
            const _user = await prismaClient.user.findFirst({ 
                where: {
                    email: user.email
                }
            });

            if (_user) {
                return {
                    alreadyExist: true,
                    msg: `This email already registred!`,
                    user

                }
            }

            const __user = await prismaClient.user.create({
                data: {
                    name: user.name,
                    email: user.email
                },
                select: {
                    name: true,
                    email: true,
                    id: true
                }
            });

            return {
                alreadyExist: false,
                msg: "User was craeted with success!",
                user: __user
            
            }

        } catch (err) {
            return {
                err,
                msg: "Occurred an error on create user!"
            }

        }

    }
    
}
