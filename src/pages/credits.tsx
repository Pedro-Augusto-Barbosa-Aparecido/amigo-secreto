import { GetStaticProps } from "next";
import { BsLinkedin, BsInstagram, BsGithub } from "react-icons/bs";

import Link from "next/link";
import Image from "next/image";

export default function Credits (props: {}) {
    return (
        <main 
            className="w-full h-with-nav pl-24 pt-28"
        >
            <h1
                className="text-5xl text-dark-orange-600 font-istok-web font-extrabold mb-4"
            >
                Desenvolvedores: 
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
                        <h2 className="ml-4 text-md">Tainara Inácio</h2>
                    </div>
                    <div className="flex w-full">
                        <Link href={"https://www.linkedin.com/in/tainara-in%C3%A1cio-637657212/"}>
                            <a className="flex mt-8 hover:bg-blue-500 hover:bg-opacity-30 bg-gray-back-100 items-center rounded-md mr-4 py-4 px-8">
                                <BsLinkedin 
                                    className="mr-4 "
                                />
                                Linked In
                            </a>
                        </Link>
                        <Link href={"https://instagram.com/inacio.design?igshid=YmMyMTA2M2Y="}>
                            <a className="bg-gray-back-100 hover:bg-red-800 hover:bg-opacity-50 items-center rounded-md flex mt-8 py-4 px-8">
                                <BsInstagram 
                                    className="mr-4 "
                                />
                                Instagram
                            </a>
                        </Link>
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
                        <h2 className="ml-4 text-md">Pedro Augusto Barbosa Aparecido</h2>
                    </div>
                    <div className="flex w-full">
                        <Link href={"https://www.linkedin.com/in/pedro-augusto-195247217"}>
                            <a className="flex mt-8 hover:bg-blue-500 hover:bg-opacity-30 bg-gray-back-100 items-center rounded-md mr-4 py-4 px-8">
                                <BsLinkedin 
                                    className="mr-4 "
                                />
                                Linked In
                            </a>
                        </Link>
                        <Link href={"https://github.com/Pedro-Augusto-Barbosa-Aparecido"}>
                            <a className="bg-gray-back-100 hover:bg-black hover:bg-opacity-50 items-center rounded-md flex mt-8 py-4 px-12">
                                <BsGithub 
                                    className="mr-4 "
                                />
                                Github
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );

}

export const getStaticProps: GetStaticProps = async (ctx) => {
    return {
        props: {

        }
    }

}
