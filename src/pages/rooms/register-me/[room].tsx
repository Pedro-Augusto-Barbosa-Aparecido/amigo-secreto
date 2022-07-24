import { GetServerSideProps } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../api";
import { HiOutlineMail } from "react-icons/hi";
import { MdDriveFileRenameOutline } from "react-icons/md";

import Router from "next/router";
import Spinner from "../../../components/Spinner";

import GetRoomController from "../../../database/controllers/Room/GetRoomController";
import classNames from "classnames";

interface IRoomRegisterProps {
    id: string
    name: string
}

interface IPerson {
    name: string 
    email: string

}

export default function RegisterPersonPage (props: IRoomRegisterProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [spinnerMessage, setSpinnerMessage] = useState<string>("");

    const { register, handleSubmit } = useForm<IPerson>();
    
    const handleRegisterPerson = (data: IPerson) => {
        setIsLoading(false);
        setSpinnerMessage("Realizando seu registro no grupo");
        setIsLoading(true);

        api.post("/api/services/room/register-person/", {
            person: data,
            room: props.id
        }).then((res) => {
            if (res.data.sucess) {
                Router.push(`/rooms/sucess/${props.name.replaceAll(" ", "-")}`);

            }
        }).finally(() => setIsLoading(false));

    }

    return (
        <main className="w-full h-with-nav flex flex-col items-center justify-center">
            {
                isLoading && 
                <Spinner 
                    messageSpan={spinnerMessage}
                />
            }
            <div
                className="flex flex-col items-start justify-start w-3/12"
            >
                <h2 className="text-3xl mb-8 text-dark-orange-600 font-istok-web font-extrabold text-left">
                    { props.name }
                </h2>
                <p className="font-istok-web text-md">
                    Participe deste grupo também e divirta-se com seus amigos. Para isso apenas digite o seu nickname ou 
                    nome e seu e-mail para ser inserido no grupo.
                </p>
                <form
                    className="w-full mt-12"
                    onSubmit={handleSubmit(handleRegisterPerson)}
                >
                    <div className={
                        classNames(
                            "w-full relative",
                            { "-z-10": isLoading }
                        )
                    }>
                        <input 
                            {...register("name")}
                            id="name"
                            name="name"
                            required
                            placeholder="Insira seu nome ou nickname..."
                            className="w-full outline-none border border-gray-900 shadow-sm shadow-slate-700 rounded py-3 px-4 font-istok-web placeholder:text-gray-500 placeholder:font-istok-web placeholder:italic"
                        />
                        <MdDriveFileRenameOutline 
                            className="absolute right-3 top-3 text-gray-600 opacity-75 text-2xl"
                        />
                    </div>
                    <div className={
                        classNames(
                            "w-full relative",
                            { "-z-10": isLoading }
                        )
                    }>
                        <input 
                            {...register("email")}
                            id="email"
                            name="email"
                            required
                            placeholder="Insira seu email..."
                            className="w-full mt-2 outline-none border border-gray-900 shadow-sm shadow-slate-700 rounded py-3 px-4 font-istok-web placeholder:text-gray-500 placeholder:font-istok-web placeholder:italic"
                        />
                        <HiOutlineMail 
                            className="absolute right-3 top-5 text-gray-600 opacity-75 text-2xl"
                        />
                    </div>
                    <button 
                        className="py-3 w-full bg-dark-orange-700 rounded-md mt-8 font-istok-web text-white text-lg font-extrabold shadow-md shadow-slate-800 hover:bg-opacity-75 active:scale-90"
                    >
                        Inscreva-se
                    </button>
                </form>
            </div>
        </main>
    );

}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { room } = ctx.query;
    const roomController = new GetRoomController();

    const _room = await roomController.searchByName(room?.toString().replaceAll('-', ' ') || "");

    if (_room.notExist || _room.err)
        return {
            redirect: {
                destination: "/room-not-exist",
                permanent: false
            }
        }

    return {
        props: {
            ..._room.room
        }
    }

} 
