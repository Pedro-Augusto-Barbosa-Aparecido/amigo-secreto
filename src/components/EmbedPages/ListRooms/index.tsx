import classNames from "classnames";
import Router from "next/router";
import Spinner from "../../Spinner";

import { useContext, useEffect, useState } from "react";
import { MdArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { AuthContext } from "../../../context/Auth";
import { api } from "../../../api";
import { Card } from "../../Card";

interface RoomProps {
    id: string
    name: string
    roomType: string
    sorterDate: string

}

export default function ListRooms () {
    const [rooms, setRooms] = useState<RoomProps[]>([]);
    const [spinnerMessage, setSpinnerMessage] = useState<string>("Buscando suas salas ou que apenas participa");
    const [showSpinner, setShowSpinner] = useState<boolean>(true);
    
    const { user } = useContext(AuthContext);

    const roomsEmpty = (rooms.length == 0);

    useEffect(() => {
        if (!user) Router.push("/login");
        
        api.post("/api/services/room/", {
            email: user?.email,
            userId: user?.id
        }).then((res) => {
            // if (res.data.success && (res.data.total > 0)) {
                setRooms(res.data.rooms.slice(0, 6));
                console.log(res)
                console.log(rooms)

            // }
        }).finally(() => setShowSpinner(false));

    }, []);

    return (
        <section className="text-white relative font-istok-web flex flex-col items-center justify-center w-full h-full">
            <div
                className={
                    classNames(
                        "",
                        { "hidden": !showSpinner }
                    )
                }
            >
                <Spinner 
                    messageSpan={spinnerMessage}
                />
            </div>
            <div className={
                classNames(
                    "flex flex-col items-center justify-center w-full h-full",
                    { "hidden": !roomsEmpty }
                )
            }>
                <h2 className="text-5xl font-bold">Comece a brincar</h2>
                <p className="text-xl font-istok-web font-thin">Você precisa participar de um grupo.</p>
                <p className="text-3xl mt-14">Crie um grupo ou localize um existente e</p>
                <p className="text-dark-orange-700 text-5xl mt-4 mb-8 font-semibold">Divirta-se</p>
            </div>
            <div className={
                classNames(
                    "absolute top-8 grid grid-cols-3 grid-rows-2 w-full gap-4 px-12",
                    { "hidden": (rooms.length == 0) }
                )
            }>
                <div className="h-full z-10 absolute text-5xl flex items-center hover:bg-black">
                    <MdArrowBackIosNew />
                </div>
                {
                    rooms.map(room => {
                        return <Card 
                            key={room.id}
                            id={room.id}
                            name={room.name}
                            sorterDate={room.sorterDate}
                            typeRoom={room.roomType}
                            imageRoom="/imgs/rooms-image/room-one.png"
                        />
                    })
                }
                <div className="h-full z-10 absolute text-5xl flex items-center right-0 hover:bg-black">
                    <MdOutlineArrowForwardIos />
                </div>
            </div>
        </section>
    );

}