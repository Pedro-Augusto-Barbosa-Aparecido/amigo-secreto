import { NextApiRequest, NextApiResponse } from "next";
import GetUserController from "../../../database/controllers/User/GetUserController";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST")
        return res.status(401).send({
            msg: "This method is not allowed!"
        });

    const { email, password } = req.body; 

    const userController = new GetUserController();
    const user = await userController.getForLogin({ email });   
    
    if (!user.user)
        return res.status(200).send({
            success: false,
            msg: user.msg,
            userNotExist: user.userNotExist,
            incorrectEmail: true,
            incorrectPassword: false,
        });

    if (!(await bcrypt.compare(password, user.user.password))) 
        return res.status(200).send({
            success: false,
            userNotExist: false,
            incorrectPassword: true,
            incorrectEmail: false,
            msg: "Password invalid!"
        });

    const token = sign({}, process.env.TOKEN_KEY || '', {
        expiresIn: `${60 * 60 * 24 * 5}d`,
        subject: user.user.id
    });

    return res.status(200).send({
        success: true,
        userNotExist: false,
        msg: "Success login!",
        user: {
            name: user.user.name,
            id: user.user.id,
            avatarUrl: user.user.avatarUrl,
            token
        }
    });

}
