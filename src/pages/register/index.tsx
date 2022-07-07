import styles from "./styles.module.css";

import Image from "next/image";
import Input from "../../components/Input";

import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";

export default function Register () {
    const { register, handleSubmit } = useForm();

    const handleRegister = (data: any) => {
        console.log(data);

    }

    return (
        <main className="bg-gray-back-400 h-register w-full">
            <div className="p-14">
                <div className="flex">
                    <div className="w-full">
                        <h2 className="text-dark-orange-600 text-5xl font-bold">
                            Faça seu cadastro
                        </h2>
                        <p className="font-quick-sand w-1/4 mt-4 ml-1 font-medium">
                            Preencha as informações para efetuar o seu cadastro e começar a brincadeira
                        </p>
                    </div>
                    <div>
                        <div className="flex flex-col mr-12">
                            <button className="bg-dark-blue-600 p-3 rounded active:scale-90 hover:opacity-80 transition-opacity">
                                <div className="flex w-80 items-center justify-start">
                                    <div className="bg-white p-2 mr-4 rounded">
                                        <FcGoogle />
                                    </div>
                                    <span className="font-black text-lg font-istok-web text-white">
                                        Inscrever-se com o Google
                                    </span>
                                </div>
                            </button>
                            <button className="mt-6 bg-dark-blue-600 p-3 rounded active:scale-90 hover:opacity-80 transition-opacity">
                                <div className="flex w-80 items-center justify-start">
                                    <div className="bg-white p-2 mr-4 rounded">
                                        <ImFacebook2 className="text-blue-800 rounded-sm" />
                                    </div>
                                    <span className="font-black text-lg font-istok-web text-white">
                                        Inscrever-se com o Facebook
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <Input 
                        register={register}
                        name="name"
                        id="name"
                        _type="text"
                        label="Nome"
                    />
                    <Input 
                        register={register}
                        name="email"
                        id="email"
                        _type="email"
                        label="E-mail"
                    />
                    <Input 
                        register={register}
                        name="confirm_email"
                        id="confirm_email"
                        _type="email"
                        label="Confirme seu email"
                    />
                    <Input 
                        register={register}
                        name="password"
                        id="password"
                        _type="password"
                        label="Senha"
                    />
                    <button 
                        className="font-istok-web pt-3 pb-2 px-12 mt-4 rounded-nl text-default font-bold hover:opacity-90 active:cursor-default active:scale-90 bg-dark-blue-600 text-dark-orange-600"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
            <span 
                className={`absolute bottom-0 right-0 ${styles.imgRegister}`}
            >
                <Image 
                    src={"/imgs/img-background-register-s.png"}
                    layout="fixed"
                    width={560}
                    height={470}
                    priority
                    
                />
            </span>
        </main>
    );

}