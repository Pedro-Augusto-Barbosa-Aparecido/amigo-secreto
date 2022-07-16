import classNames from "classnames";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function CreateRooms () {
    const [roomTypeSelect, setRoomTypeSelect] = useState<string>("Normal");
    const [rotateIcon, setRotateIcon] = useState<boolean>(false);
    const [typeOptions, setTypeOptions] = useState<string[]>([
        "Amigo Chocolate",
        "Normal", 
    ])

    const { register, handleSubmit } = useForm();

    return (
        <section className="w-full font-istok-web text-white flex flex-col justify-start items-start px-8 py-10 pb-0">
            <h2 className="font-semibold text-5xl">Criar Grupo</h2>
            <p className="text-xl font-thin">Informe os dados do novo grupo que deseja criar</p>
            <form className="w-1/3 mt-4">
                <div className="flex flex-col mt-2">
                    <label className="text-xl" htmlFor="roomName">Nome do Grupo<span className="text-red-500">*</span></label>
                    <input 
                        {...register("roomName")}
                        className="rounded-md border-l-8 border-l-dark-orange-700 h-12 outline-none p-4 px-2 text-black" 
                        name="roomName" 
                        id="roomName" 
                        required 
                        type={"text"} 
                    />
                </div>
                <div className="flex flex-col mt-4">
                    <label className="text-xl" htmlFor="roomType">Tipo do Grupo<span className="text-red-500">*</span></label>
                    <input className="hidden" id="roomType" name="roomType" />
                    <div className="relative">
                        <span 
                            className="flex hover:cursor-pointer font-istok-web active:cursor-default items-center justify-between text-lg p-4 px-2 w-full h-12 border-l-dark-orange-700 border-l-8 rounded-md text-black bg-white"
                            onClick={() => setRotateIcon(state => !state)}
                        >
                            <p>{ roomTypeSelect }</p>
                            <RiArrowDropDownLine className={
                                classNames(
                                    "text-3xl", 
                                    { "rotate-180": rotateIcon }
                                )
                            } />
                        </span>
                        <div className={classNames(
                            "w-full absolute text-center overflow-y-auto max-h-32 min-h-12 flex flex-col text-black bg-white rounded-md mt-2",
                            { "hidden": !rotateIcon }
                        )} id="select-custom">
                            {
                                typeOptions.map((opt, index) => {
                                    return (
                                        <span key={opt} className={classNames(
                                            "h-12 py-4 hover:bg-gray-200 hover:cursor-pointer bg-white flex items-center justify-center font-istok-web",
                                            { "rounded-tl-md": index === 0, "rounded-bl-md": index === (typeOptions.length - 1) }
                                        )}
                                            onClick={() => {
                                                setRoomTypeSelect(opt);
                                                setRotateIcon(state => !state);
                                            }}
                                        >
                                            { opt }
                                        </span>
                                    );
                                })
                            }
                        </div>
                    </div>  
                </div>
                <div className="flex flex-col mt-4">
                    <label className="text-xl" htmlFor="datepicker">Data do Sorteio<span className="text-red-500">*</span></label>
                    <input 
                        {...register("datepicker")}
                        type={"date"} 
                        id="datepicker" 
                        name="datepicker" 
                        required
                        className="rounded-md hover:cursor-pointer border-l-8 border-l-dark-orange-700 h-12 outline-none p-4 px-2 text-black"
                    />
                </div>
                <button
                    className={classNames(
                        "bg-dark-orange-600 py-1 px-2 rounded-nl text-lg mt-8 hover:opacity-80 active:scale-90 font-semibold font-istok-web",
                        {}
                    )}
                >
                    Create Grupo
                </button>
            </form>
        </section>
    );

}