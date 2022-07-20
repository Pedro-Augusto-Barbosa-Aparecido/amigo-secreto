import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage () {
    return (
        <main className="w-full h-with-nav">
            <div className="w-full h-full">
                <Image 
                    src={"/imgs/404-image-opt-one.jpg"}
                    layout="fill"
                    objectFit="fill"
                    priority
                />
                <div className="absolute text-white font-istok-web p-16 w-full flex flex-col h-with-nav">
                    <div className="text-white text-6xl mb-16">
                        <span>Código </span>
                        <span className="text-dark-orange-600 font-bold">404!</span>
                    </div>
                    <p className="text-3xl w-5/12">
                        Desculpe por esse incômodo. Porém está parte que você tentou acessar não está disponivel ou não foi encontrada no sistema.
                    </p>
                    <Link href="/">
                        <a className="mt-24 py-4 pl-8 hover:underline bg-gray-200 bg-opacity-10 font-normal  hover:bg-opacity-80 active:cursor-default hover:bg-gray-back-400 rounded text-md w-2/12">
                            Voltar para página inicial.
                        </a>
                    </Link>
                </div>
            </div>
        </main>
    );
}
