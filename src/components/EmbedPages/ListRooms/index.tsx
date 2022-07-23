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
    const [totalRooms, setTotalRooms] = useState<RoomProps[]>([]);
    const [spinnerMessage, setSpinnerMessage] = useState<string>("Buscando suas salas ou que apenas participa");
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(totalRooms.length);
    const [availableNext, setAvailableNext] = useState<boolean>(false);
    const [availablePrevious, setAvailablePrevious] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(true);

    const ROOMS_PER_PAGE = 6;
    
    const { user } = useContext(AuthContext);

    const roomsEmpty = (rooms.length == 0);

    useEffect(() => {
        if (!user) Router.push("/login");
        
        api.post("/api/services/room/", {
            email: user?.email,
            userId: user?.id
        }).then((res) => {
            if (res.data.success) {
                setTotalRooms(res.data.rooms);
                
            }

            
        }).finally(() => setShowSpinner(false));

    }, []);

    useEffect(() => {
        setAvailablePrevious(false);
        setCurrentPage(0);
        setTotalPage(Math.ceil(totalRooms.length / 6));

        if (Math.ceil(totalRooms.length / 6) === 1) 
            setAvailableNext(false);
        else
            setAvailableNext(true);

        setRooms(totalRooms.slice(currentPage, ((currentPage + 1) * ROOMS_PER_PAGE)));

    }, [totalRooms]);

    const changePage = (button: "previous" | "next") => {
        if (button == "next") {
            setRooms(totalRooms.slice(((currentPage + 1) * ROOMS_PER_PAGE), ((currentPage + 2) * ROOMS_PER_PAGE)));
            setCurrentPage(current => current + 1);
            setAvailablePrevious(true);

            if (((currentPage + 2) * ROOMS_PER_PAGE) > totalRooms.length)
                setAvailableNext(false);

        } else if (button == "previous") {
            setRooms(totalRooms.slice(((currentPage - 1) * ROOMS_PER_PAGE), ((currentPage) * ROOMS_PER_PAGE)));
            setCurrentPage(current => current - 1);
            setAvailableNext(true);

            if ((currentPage - 1) === 0)
                setAvailablePrevious(false);

        } else {
            throw new Error("Incorrect button!!");

        }

    }

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
                <div 
                    className={
                        classNames(
                            "h-full z-10 absolute text-5xl flex items-center left-0 hover:opacity-80 cursor-pointer active:scale-90 active:cursor-default",
                            { "hidden": !availablePrevious }
                        )
                    }
                    onClick={() => {
                        changePage("previous");
                    }}
                >
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
                <div className="absolute z-20 -bottom-10 left-12 flex text-lg font-istok-web text-black items-center">
                    <p className="mr-4">Página atual: { currentPage + 1 }</p>
                    <span className="mr-4">&diams;</span>
                    <p className="">Total de salas: { totalRooms.length }</p>
                </div>
                <div 
                    className={
                        classNames(
                            "h-full z-10 absolute text-5xl flex items-center right-0 hover:opacity-80 cursor-pointer active:scale-90 active:cursor-default",
                            { "hidden": !availableNext }
                        )
                    }
                    onClick={() => changePage("next")}
                >
                    <MdOutlineArrowForwardIos />
                </div>
            </div>
        </section>
    );

}