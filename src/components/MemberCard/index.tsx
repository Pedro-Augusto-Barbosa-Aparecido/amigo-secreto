import { memo } from "react";
import { GiNorthStarShuriken, GiStarShuriken } from "react-icons/gi";

interface IMemberProps {
    name: string
    isCreator?: boolean

}

function MemberCardComponent (props: IMemberProps) {
    return (
        <div className="w-2/5 p-4 flex items-center justify-start rounded-lg align-text-bottom first:mt-4 mb-2 last:mb-0 border-2 border-gray-back-200 bg-white">
            {
                props.isCreator 
                ? <GiNorthStarShuriken 
                    title="Criador do grupo"
                    className="text-2xl text-dark-orange-600 mr-4" 
                /> 
                : <GiStarShuriken 
                    title="Participante"
                    className="text-2xl text-dark-blue-600 mr-4"
                />
            }
            <p 
                className="text-xl font-istok-web m-0"
            >
                {/* {props.isCreator ? "Criador" : "Participante"}: &nbsp;&nbsp; */}
                {props.name}
            </p>

        </div>
    );

}

export const MemberCard = memo(MemberCardComponent);
