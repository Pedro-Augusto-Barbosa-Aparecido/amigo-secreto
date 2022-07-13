import { NextApiRequest, NextApiResponse } from "next";
import { decode } from "jsonwebtoken";
import GetUserController from "../../../database/controllers/User/GetUserController";

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
    const { token } = req.body;
    const [, jwtToken] = token.split(' ');

    const data = await decode(jwtToken, { json: true });
    const userController = new GetUserController();

    const user = await userController.get({ id: data?.sub || "" });

    if (!user)
        return res.status(401).send({
            msg: "Not authorized"
        });

    return res.send({
        user
    });

}
