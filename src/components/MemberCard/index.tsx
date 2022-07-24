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
            <div className="card-member h-fit">
                <Image
                    src={"/imgs/rooms-image/participantes/partcipant.png"}
                    width={100}
                    height={"100%"}
                    layout="fixed"
                    className="h-full"
                    priority
                />
            </div>
            <div className="w-full flex flex-col items-start justify-center">
                <span className="ml-8 text-2xl block w-56 whitespace-nowrap overflow-hidden text-ellipsis">
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
