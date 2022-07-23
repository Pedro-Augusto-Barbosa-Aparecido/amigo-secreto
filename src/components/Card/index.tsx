import { memo } from "react";

import Image from "next/image";
import Link from "next/link";

export interface CardProps {
    id: string,
    name: string,
    typeRoom: string,
    sorterDate: string,
    imageRoom: string

};

function CardComponent (props: CardProps) {
    const formatDate = (date: Date): string => {
        return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`

    }

    return (
        <div className="bg-white p-5 flex items-start justify-start text-black h-fit rounded-md">
            <div className="w-52 h-16">
                <Image
                    src={props.imageRoom}
                    width={"100%"}
                    height={70}
                    layout="responsive"
                    className="rounded-md"
                />
            </div>
            <div className="overflow-hidden flex flex-col justify-start items-start p-4">
                <div className="font-istok-web font-normal flex items-center justify-start w-full">
                    <p className="w-fit inline-block overflow-hidden text-ellipsis whitespace-nowrap mr-2 font-bold text-dark-orange-600">Nome do Grupo: </p>
                    <p className="block whitespace-nowrap overflow-hidden text-ellipsis">{ props.name }</p>
                </div>
                <div className="flex items-center justify-start w-full">
                    <p className="w-fit mr-2 font-bold text-dark-orange-600">Tipo: </p>
                    <p className="w-full overflow-hidden text-ellipsis">{ props.typeRoom }</p>
                </div>
                <div className="flex items-center justify-start w-full">
                    <p className="font-bold mr-2 text-dark-orange-600">Data do Sorteio: </p>
                    <p className="overflow-hidden text-ellipsis">{ formatDate(new Date(props.sorterDate)) }</p>
                </div>
                <Link href={`/room/${props.id}/`}>
                    <a className="hover:bg-opacity-80 px-12 py-1 ml-12 mt-5 rounded-nl font-istok-web font-semibold text-xl text-white bg-dark-orange-600 shadow-md shadow-gray-700">
                        Entrar
                    </a>
                </Link>
            </div>
        </div>
    );

}

export const Card = memo(CardComponent);
