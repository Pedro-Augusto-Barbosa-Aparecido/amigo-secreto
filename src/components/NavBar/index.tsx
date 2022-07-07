import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export function NavBar () {
    const [isLoggin, setIsLoggin] = useState<boolean>(false);
    const [isRegister, setIsRegister] = useState<boolean>(false);
    
    const router = useRouter();

    useEffect(() => {
        setIsRegister(router.pathname.includes("/register"));
        setIsLoggin(router.pathname.includes("/login"));

    }, []);

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
                <Link href="/register" >
                    <a 
                        className={classNames(
                            "font-istok-web pt-3 pb-2 px-12 mr-4 rounded-nl text-default font-bold hover:opacity-90 active:cursor-default active:scale-90",
                            { 
                                'text-dark-blue-600': !isRegister, 
                                'text-dark-orange-600': isRegister,
                                'bg-dark-blue-600': isRegister
                            }
                        )}
                        onClick={() => {
                            setIsRegister(true);
                            setIsLoggin(false);
                        }}
                    >
                        Cadastrar
                    </a>
                </Link>
                <Link href="/login" >
                    <a 
                        className={
                            classNames(
                                "font-istok-web text-dark-orange-600 pt-3 pb-2 px-20 rounded-nl text-default font-bold hover:opacity-90 active:cursor-default active:scale-90",
                                { 'bg-dark-blue-600': isLoggin }
                            )
                        }
                        onClick={() => {
                            setIsRegister(false);
                            setIsLoggin(true);
                        }}
                    >
                        LOGIN
                    </a>
                </Link>
            </div>
        </nav>
    );

}