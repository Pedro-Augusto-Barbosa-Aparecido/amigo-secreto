import { GetStaticProps } from "next";
import { BsLinkedin, BsInstagram, BsGithub } from "react-icons/bs";
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";

import styles from "./register/styles.module.css";

import Link from "next/link";
import Image from "next/image";

export default function Credits (props: {}) {
    return (
        <main 
            className="w-full h-with-nav pl-24 pt-28"
        >
            <h1
                className="text-5xl text-dark-orange-600 font-istok-web font-extrabold mb-20"
            >
                Conheça os desenvolvedores: 
            </h1>
            <div
                className="text-2xl font-istok-web"
            >
                <div className="flex w-1/2 flex-col">
                    <div className="flex items-center justify-start">
                        <Image 
                            src={"/imgs/devs/tainara.jpg"}
                            width={100}
                            height={100}
                            className="rounded-full"
                        />
                        <div className="ml-4 ">
                            <h2 className="text-md">Tainara Inácio</h2>
                    
                            <div className="flex w-full items-center mt-4">
                                <Link href={"https://www.linkedin.com/in/tainara-in%C3%A1cio-637657212/"}>
                                    <a className="">
                                        <AiFillLinkedin 
                                            className="mr-4 text-linkedin-100 text-5xl rounded-lg"
                                        />
                                    </a>
                                </Link>
                                <Link href={"https://instagram.com/inacio.design?igshid=YmMyMTA2M2Y="}>
                                    <a className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-center">
                                        <BsInstagram 
                                            className="text-2xl text-white"
                                        />
                                    </a>
                                </Link>
                            </div>
                        </div>  
                    </div>
                </div>
                <div className="flex mt-12 w-1/2 flex-col">
                    <div className="flex items-center justify-start">
                        <Image 
                            src={"/imgs/devs/pedro-2.jpg"}
                            width={100}
                            height={100}
                            className="rounded-full"
                        />
                        <div className="ml-4 ">
                            <h2 className="text-md">Pedro Augusto Barbosa Aparecido</h2>
                            <div className="mt-4 flex items-center w-full">
                                <Link href={"https://www.linkedin.com/in/pedro-augusto-195247217"}>
                                    <a className="">
                                        <AiFillLinkedin 
                                            className="mr-4 text-linkedin-100 text-5xl rounded-lg"
                                        />
                                    </a>
                                </Link>
                                <Link href={"https://github.com/Pedro-Augusto-Barbosa-Aparecido"}>
                                    <a className="">
                                        <BsGithub 
                                            className="mr-4 text-4xl"
                                        />
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span 
                className={`absolute bottom-0 right-0 ${styles.imgRegister}`}
            >
                <Image 
                    src={"/imgs/img-background-register-s.png"}
                    layout="fixed"
                    width={560}
                    height={470}
                    alt={"Time 7 image, anime naruto"}
                    priority
                    
                />
            </span>
        </main>
    );

}

export const getStaticProps: GetStaticProps = async (ctx) => {
    return {
        props: {

        }
    }

}
