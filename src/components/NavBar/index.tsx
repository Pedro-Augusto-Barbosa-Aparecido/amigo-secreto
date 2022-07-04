import Image from "next/image";
import Link from "next/link";

export function NavBar () {
    return (
        <nav className="bg-white h-28 w-full flex justify-between items-center">
            <div className="flex items-center">
                <Image 
                    className="p-3"
                    src={"/imgs/gift.png"}
                    alt="gift logo"
                    width={108}
                    height={108}
                />
                <h1 className="font-just-me text-6xl ml-2 text-black">Amigo Secreto de Konoha</h1>
            </div>
            <div className="mr-16">
                <Link href="/">
                    <a 
                        className="font-istok-web text-dark-blue-600 pt-3 pb-2 px-12 mr-4 rounded-nl text-default font-bold hover:opacity-90 active:cursor-default"
                    >
                        Cadastrar
                    </a>
                </Link>
                <Link href="/login">
                    <a 
                        className="font-istok-web bg-dark-blue-600 text-dark-orange-600 pt-3 pb-2 px-20 rounded-nl text-default font-bold hover:opacity-90 active:cursor-default"
                    >
                        LOGIN
                    </a>
                </Link>
            </div>
        </nav>
    );

}