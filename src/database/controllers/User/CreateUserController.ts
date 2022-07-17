import prismaClient from "../../../utils/client";
import { User } from "./GetUserController";
import bcrypty from "bcryptjs";

export type UserCreate = {
    name: string
    email: string,
    password: string
    avatarUrl: string

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
            const hash = await bcrypty.hash(user.password, 10);
            const __user = await prismaClient.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    password: hash,
                    avatarUrl: user.avatarUrl
                },
                select: {
                    name: true,
                    email: true,
                    password: false,
                    avatarUrl: true,
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
