import { GetServerSideProps } from "next"
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../../context/Auth";

interface IRoomSucessPageProps {
    roomName: string

}

export default function SucessPage (props: IRoomSucessPageProps) {
    const { user } = useContext(AuthContext);

    return (
        <main className="w-full flex flex-col items-center justify-center">
            <h1 
                className="text-5xl my-12 text-dark-orange-600 font-istok-web font-semibold"
            >
                Parabéns você está dentro!
            </h1>
            <p className="w-2/5 text-2xl">
                Você concluiu o registro na sala {props.roomName.replaceAll('-', ' ')}, agora basta aguardar o e-mail com o seu amigo secreto!
            </p>
            {
                user?.token 
                ? <Link href={"/"}>
                    <a className="text-xl py-4 px-8 bg-gray-400 hover:bg-gray-back-100 rounded mt-8">
                        Voltar para home
                    </a>
                </Link> 
                : <Link href={"/register"}>
                    <a className="text-xl py-4 px-8 bg-gray-400 hover:bg-gray-back-100 rounded mt-8">
                        Registre-se
                    </a>
                </Link>    
            }
        </main>
    );

}

export const getServerSideProps: GetServerSideProps = async (ctx) => { 
    const { id } = ctx.query;

    return {
        props: {
            roomName: id

        }
    }

}
