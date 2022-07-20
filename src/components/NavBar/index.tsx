import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";

import { useSession } from "next-auth/react";
import { HiMenu } from "react-icons/hi";
import { IoPersonCircle } from "react-icons/io5";


import * as Dialog from "@radix-ui/react-dialog";
import { AuthContext } from "../../context/Auth";

export function NavBar () {
    const [isLoggin, setIsLoggin] = useState<boolean>(false);
    const [isRegister, setIsRegister] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    
    const { user, singOut } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        setIsRegister(router.pathname.includes("/register"));
        setIsLoggin(router.pathname.includes("/login"));

    }, [router.pathname]);

    return (
        <nav className="bg-white h-28 w-full flex justify-between items-center">
            <Link href={"/"}>
                <div className="flex items-center cursor-pointer active:cursor-default">
                    <Image 
                        className="p-3"
                        src={"/imgs/gift.png"}
                        alt="gift logo"
                        width={108}
                        height={108}
                    />
                    <h1 className="font-just-me text-6xl ml-2 text-black">Amigo Secreto de Konoha</h1>
                </div>
            </Link>
            <div className="mr-16">
                { 
                    !user?.token ? 
                    <>
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
                    </> :
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <HiMenu 
                                className={classNames("text-5xl", { })}
                                onClick={() => setMenuOpen(state => !state)}
                                id="open-dialog"
                                width={150}
                                height={150}
                            />
                        </Dialog.Trigger>
                        <Dialog.Content>
                            <div className="w-90 right-0 z-50 bg-white mt-7 rounded-b-nl h-fit py-4 absolute shadow-lg">
                                <div className="flex pb-4 px-4">
                                    <Image 
                                        src={user?.avatarUrl ? user?.avatarUrl : "/imgs/default-login-image.png"}
                                        width={80}
                                        height={80}
                                        className="rounded-full"
                                        alt={"profile image"}
                                    />
                                    <div className="flex flex-col items-start justify-center">
                                        <span className="text-lg ml-5 font-istok-web">{ user?.name }</span>
                                        <span className="text-sm ml-5 font-istok-web">{ user?.email }</span>
                                    </div>
                                </div>
                                <hr  />
                                <div className="p-4 pb-0">
                                    <div className="flex flex-col items-start justify-between">
                                        <Link href={`/profile/${user.id}`}>
                                            <a className="text-xl mb-2">Minha Conta</a>
                                        </Link>
                                        <button className="text-xl mb-2">Meus Grupos</button>
                                        <button className="text-xl" onClick={singOut}>Sair</button>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Content>
                    </Dialog.Root>
                }
            </div>
        </nav>
    );

}