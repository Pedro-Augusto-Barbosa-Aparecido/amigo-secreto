import Image from "next/image";
import { memo } from "react";
import { GiNorthStarShuriken, GiStarShuriken } from "react-icons/gi";

interface IMemberProps {
    name: string
    isCreator?: boolean

}

function MemberCardComponent (props: IMemberProps) {
    return (
        <div className="text-white font-istok-web flex items-center justify-start">
            <div className="card-member h-img-m border-2 rounded-l-xl border-white">
                <Image
                    src={"/imgs/rooms-image/participantes/partcipant.png"}
                    width={100}
                    height={100}
                    layout="fixed"
                    className="rounded-l-lg"
                    priority
                />
            </div>
            <div className="w-72 text-dark-blue-600 h-full rounded-r-xl flex bg-white flex-col text-center items-center justify-center">
                <span className="text-2xl block w-56 whitespace-nowrap overflow-hidden text-ellipsis">
                    { props.name } 
                </span>
                <span className="text-sm w-64 text-center">
                    ({ props.isCreator ? "Dono(a) do grupo" : "Participante" })
                </span>
            </div>
        </div>
    );

}

export const MemberCard = memo(MemberCardComponent);
