import { GetServerSideProps } from "next";
import GetPersonController from "../../../database/controllers/People/GetPersonController";
import GetUserController from "../../../database/controllers/User/GetUserController";

import { useState } from "react";

import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";

interface IFriend {
    friend: string
}

export default function Result (props: IFriend) {
    const [inputType, setInputType] = useState<"password" | "text">("password");
    
    return (
        <main
            className="w-full h-with-nav flex flex-col items-center justify-center"
        >
            <p 
                className="text-3xl font-istok-web font-normal"
            >Certifique-se que ninguém está olhando...</p>
            <div
                className="mt-12 flex items-center h-12 justify-start border border-black rounded-md w-3/12"
            >
                <input
                    type={inputType}
                    readOnly
                    disabled
                    value={props.friend}
                    className="bg-white h-full w-full text-center rounded-l-md"
                />
                <div 
                    className="hover:cursor-pointer active:cursor-default hover:opacity-80 bg-dark-orange-600 h-full rounded-r-md w-12 flex items-center justify-center text-white font-istok-web font-normal text-xl"
                    onClick={() => setInputType(state => state === "password" ? "text" : "password")}
                >
                    {
                        inputType === "text" 
                        ? <RiEyeLine
                            
                        />
                        : <RiEyeCloseLine
                            
                        />
                    }
                </div>
            </div>
        </main>
    );

}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { friend } = ctx.query;

    const personController = new GetPersonController();
    const userController = new GetUserController();
    const _friend = await personController.getById(friend?.toString() || "");

    if (_friend.err || _friend.notExist) {
        const __friend = await userController.get({id: friend?.toString()});

        if (__friend.err || __friend.userNotExist)
            return {
                redirect: {
                    destination: "/not-found-person",
                    permanent: false
                }
            }
        
        return {
            props: {
                friend: __friend.user?.name
            }
        }

    }

    return {
        props: {
            friend: _friend
        }
    }

}
