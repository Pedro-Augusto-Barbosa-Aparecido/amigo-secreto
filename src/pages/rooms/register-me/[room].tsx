import { GetServerSideProps } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../api";
import { HiOutlineMail } from "react-icons/hi";
import { MdDriveFileRenameOutline, MdClose } from "react-icons/md";

import Router from "next/router";
import Spinner from "../../../components/Spinner";

import GetRoomController from "../../../database/controllers/Room/GetRoomController";
import classNames from "classnames";

import * as Dialog from "@radix-ui/react-dialog";

import Image from "next/image";

interface IRoomRegisterProps {
    id: string
    name: string
    sorterDate: string
    people: number
    roomType: string
}

interface IPerson {
    name: string 
    email: string

}

export default function RegisterPersonPage (props: IRoomRegisterProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [spinnerMessage, setSpinnerMessage] = useState<string>("");
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const { register, handleSubmit } = useForm<IPerson>();
    
    const handleRegisterPerson = (data: IPerson) => {
        setShowMenu(false);
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
            <div className="w-11/12 flex items-center justify-start">
                <h1 className="text-5xl text-dark-orange-600 font-istok-web font-extrabold">
                    Grupo {props.name.replaceAll('-', ' ')}
                </h1>
            </div>
            <div className='bg-blue-hv-200 w-11/12 flex items-center justify-start pl-16 h-tab rounded-nl mt-8'>
                <div>
                    <Image 
                        src={"/imgs/rooms-image/room-one.png"}
                        layout="fixed"
                        width={400}
                        height={400}
                        className="rounded-xl"
                    />
                </div>
                <div 
                    className="w-full h-2/3 ml-12 flex flex-col justify-end items-start"
                >
                    <div className="flex items-center mb-4 justify-start">
                        <span className="text-2xl font-istok-web text-white font-extrabold">
                            Grupo: </span>
                        <span className="text-white ml-2 font-istok-web text-lg">
                            { props.name }</span>
                    </div>
                    <div className="flex items-center mb-4 justify-start">
                        <span className="text-2xl font-istok-web text-white font-extrabold">
                            Tipo: </span>
                        <span className="text-white ml-2 font-istok-web text-lg">
                            { props.roomType }</span>
                    </div>
                    <div className="flex items-center mb-4 justify-start">
                        <span className="text-2xl font-istok-web text-white font-extrabold">
                            Data do Sorteio: </span>
                        <span className="text-white ml-2 font-istok-web text-lg">
                            { `${(new Date(props.sorterDate)).getUTCDate().toString().padStart(2, '0')}-${((new Date(props.sorterDate)).getUTCMonth() + 1).toString().padStart(2, '0')}-${(new Date(props.sorterDate)).getFullYear()}` }
                        </span>
                    </div>
                    <div className="flex items-center mb-20 justify-start">
                        <span className="text-2xl font-istok-web text-white font-extrabold">
                            Participantes: </span>
                        <span className="text-white ml-2 font-istok-web text-lg">
                            { props.people }</span> 
                    </div>
                    <Dialog.Root
                        open={showMenu}
                        onOpenChange={setShowMenu}
                    >
                        <Dialog.Trigger
                            className="py-2 px-6 rounded-md shadow-md shadow-slate-700 hover:bg-opacity-70 active:scale-90 font-istok-web font-semibold text-xl text-white bg-dark-orange-600"
                            onClick={() => setShowMenu(true)}
                        >
                            Entrar no Grupo
                        </Dialog.Trigger>
                        <Dialog.Content>
                            <div
                                className="absolute flex justify-center bg-gray-back-100 items-center top-0 left-0 h-full w-full"
                            >
                                <div 
                                    className="relative w-fit flex flex-col items-center bg-white px-20 py-20 rounded-md shadow-md shadow-black"
                                >
                                    <Dialog.Close>
                                        <MdClose 
                                            className="text-2xl absolute top-4 right-4 bg-gray-back-600 rounded-md w-8 h-8"
                                        />
                                    </Dialog.Close>
                                    <p 
                                        className="text-3xl font-istok-web font-semibold text-dark-orange-600"
                                    >
                                        Participe do Grupo
                                    </p>
                                    <p
                                        className="text-black font-istok-web text-xl mt-8"
                                    >
                                        Participe desse grupo e divirta-se com seus amigos
                                    </p>
                                    <form
                                        className="w-11/12 mt-8 flex flex-col items-center"
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
                                                placeholder="Nome Completo"
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
                                                placeholder="Email"
                                                className="w-full mt-2 outline-none border border-gray-900 shadow-sm shadow-slate-700 rounded py-3 px-4 font-istok-web placeholder:text-gray-500 placeholder:font-istok-web placeholder:italic"
                                            />
                                            <HiOutlineMail 
                                                className="absolute right-3 top-5 text-gray-600 opacity-75 text-2xl"
                                            />
                                        </div>
                                        <button 
                                            className="py-3 w-5/12 bg-dark-orange-700 rounded-md mt-8 font-istok-web text-white text-lg font-extrabold shadow-md shadow-slate-800 hover:bg-opacity-80 active:scale-90"
                                        >
                                            Entrar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </Dialog.Content>
                    </Dialog.Root>
                </div>
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

    
    // @ts-ignore
    _room.room.sorterDate = (new Date(_room.room?.sorterDate || "")).toISOString();

    return {
        props: {
            ..._room.room,
            people: _room.room?.people.length
        }
    }

} 
