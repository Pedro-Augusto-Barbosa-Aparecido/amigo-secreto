import classNames from "classnames";
import Head from "next/head";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RiArrowDropDownLine, RiErrorWarningLine } from "react-icons/ri";
import { api } from "../../../api";
import { AuthContext } from "../../../context/Auth";
import Spinner from "../../Spinner";

export default function CreateRooms () {
    const [roomTypeSelect, setRoomTypeSelect] = useState<string>("Normal");
    const [messageSpinner, setMessageSpinner] = useState<string>("");
    const [rotateIcon, setRotateIcon] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [roomNameError, setRoomNameError] = useState<boolean>(false);
    const [roomHasCreated, setRoomHasCreated] = useState<boolean>(false);
    const [roomName, setRoomName] = useState<string>("");
    const [typeOptions, setTypeOptions] = useState<string[]>([
        "Amigo Chocolate",
        "Normal", 
    ])

    const { register, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);

    const handleCreateRoom = (data: any) => {
        setMessageSpinner("Criando a sala");
        setRoomNameError(false);
        setShowSpinner(true);

        
        const room = {
            roomName: data.roomName,
            dateSorter: data.datepicker,
            createdBy: user?.id,
            typeRoom: roomTypeSelect

        }

        api.post("/api/services/room/create", {
            room
        }).then((res) => {
            if (res.data.roomAlreadyExist) {
                setRoomNameError(true);
                setShowSpinner(false);

                return;

            } 

            if (res.data.err) {
                setShowSpinner(false);
                alert("Houve um erro ao tentar criar a sala.");
                
                return;

            }

            setRoomHasCreated(true);

        }).finally(() => setShowSpinner(false));

    }

    const sendWhatsZapInvite = () => {


    }

    return (
        <>  
            <Head>
                <meta property='og:type' content='website' />
                <meta property='og:title' content='Konan Amigo Secreto' />
                <meta property='og:description' content={`Venha brincar com seus amigos no velho amigo secreto! ${user?.name} está te convidando.`} />
                <meta property='og:image' content="" />
                <meta property='og:image:width' content='' />
                <meta property='og:image:height' content="" />
                <meta property='og:locale' content="pt_BR" />
                <meta property='og:url' content={`https://Konan.vercel.app/room/register-me/${roomName}`} />
                <meta property='og:site_name' content='Konan' />
            </Head>
            <section className="w-full h-full font-istok-web text-white flex flex-col justify-start items-start px-8 py-10 pb-0">
                <div
                    className={
                        classNames(
                            "",
                            { "hidden": !showSpinner }
                        )
                    }
                >
                    <Spinner 
                        messageSpan={messageSpinner}
                    />
                </div>
                <h2 className={
                    classNames(
                        "font-semibold text-5xl",
                        { "hidden": roomHasCreated }
                    )
                }>Criar Grupo</h2>
                <p className={
                    classNames(
                        "text-xl font-thin",
                        { "hidden": roomHasCreated }
                    )
                }>Informe os dados do novo grupo que deseja criar</p>
                <form className={
                    classNames(
                        "w-10/12 mt-4",
                        { "hidden": roomHasCreated }
                    )
                } onSubmit={handleSubmit(handleCreateRoom)}>
                    <div className="flex flex-col w-1/2 mt-2">
                        <label className="text-xl" htmlFor="roomName">Nome do Grupo<span className="text-red-500">*</span></label>
                        <input 
                            {...register("roomName")}
                            className="rounded-md border-l-8 border-l-dark-orange-700 h-12 outline-none p-4 px-2 text-black" 
                            name="roomName" 
                            id="roomName" 
                            required 
                            type={"text"} 
                        />
                        <div className={
                            classNames(
                                "flex items-center justify-start text-red-700 font-istok-web", 
                                { "hidden": !roomNameError }
                            )
                        }>
                            <RiErrorWarningLine />
                            <span className="ml-2 mt-1">Já existe uma sala com esse nome</span>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2 mt-4">
                        <label className="text-xl" htmlFor="roomType">Tipo do Grupo<span className="text-red-500">*</span></label>
                        <input className="hidden" id="roomType" name="roomType" />
                        <div className="relative ">
                            <span 
                                className="flex  hover:cursor-pointer font-istok-web active:cursor-default items-center justify-between text-lg p-4 px-2 w-full h-12 border-l-dark-orange-700 border-l-8 rounded-md text-black bg-white"
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
                                "w-full absolute  text-center overflow-y-auto max-h-32 min-h-12 flex flex-col text-black bg-white rounded-md mt-2",
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
                    <div className="flex flex-col w-1/2 mt-4">
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
                <div 
                    className={
                        classNames(
                            "font-istok-web w-full mt-20 items-center justify-center flex flex-col",
                            { "hidden": !roomHasCreated }
                        )
                    }
                >
                    <span 
                        className="text-5xl font-semibold"
                    >Grupo Criado com Sucesso!</span>
                    <div
                        className="text-2xl w-full flex items-baseline justify-center mt-4"
                    >
                        <span className="font-thin leading-10">Agora envie para seus amigos e </span>
                        <span className="text-dark-orange-600 leading-10 m-0 p-0 ml-2">DIVIRTA-SE</span>
                    </div>
                    <button
                        className="hover:opacity-80 active:scale-95 active:cursor-default py-1 px-8 bg-dark-orange-600 mt-16 text-xl font-istok-web font-semibold rounded-nl"
                    >
                        Convidar Amigos
                    </button>
                </div>
            </section>
        </>
    );

}