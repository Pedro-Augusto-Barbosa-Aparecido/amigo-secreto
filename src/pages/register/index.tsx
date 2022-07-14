import styles from "./styles.module.css";

import Image from "next/image";
import Input from "../../components/Input";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../api";
import Spinner from "../../components/Spinner";
import classNames from "classnames";
import { AuthContext } from "../../context/Auth";
import Router from "next/router";
// import { FcGoogle } from "react-icons/fc";
// import { ImFacebook2 } from "react-icons/im";

export default function Register () {
    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailConfirmError, setEmailConfirmError] = useState<boolean>(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
    const [confirmEmailErrorMessage, setConfirmEmailErrorMessage] = useState<string>("");
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [nameError, setNameError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [spinnerMessage, setSpinnerMessage] = useState<string>("");

    const { register, handleSubmit } = useForm();
    const { saveInfo } = useContext(AuthContext);

    const handleRegister = (data: any) => {
        setSpinnerMessage("Verificando formulário");
        if (data.email) {
            setIsLoading(true);
            api.post("/api/auth/user/", { email: data.email }).then(res => {
                var emailErrorAux = false;
                var nameErrorAux = false;
                var passwordErrorAux = false;
                if (res.data.userNotExist) {
                    emailErrorAux = true;
                    setEmailError(true);
                    setEmailErrorMessage("Email já existe no sistema");

                } else {
                    if (data.email != data.confirm_email) {
                        emailErrorAux = true
                        setEmailError(true);
                        setEmailConfirmError(true);
                        setEmailErrorMessage("Os emails não batem!");
                    } else {
                        setEmailConfirmError(false);
                        setEmailError(false);
                        emailErrorAux = false;
                    }
                }

                if (!data.password) {
                    setPasswordError(true);
                    passwordErrorAux = true;
                
                } else {
                    setPasswordError(false);
                    passwordErrorAux = false;
                
                }
        
                if (!data.name) {
                    setNameError(true);
                    nameErrorAux = true;

                } else {
                    setNameError(false);
                    nameErrorAux = false;
                
                }

                setSpinnerMessage("Cadastrando os dados.");
                if (!emailErrorAux && !passwordErrorAux && !nameErrorAux) {
                    api.post("/api/auth/register", {
                        name: data.name,
                        email: data.email,
                        password: data.password
                    }).then((res) => {
                        if (!res.data.user) {
                            alert(res.data.msg);
                            
                        } else {
                            console.log(res.data)
                            saveInfo({
                                name: res.data.user.name,
                                email: res.data.user.email,
                                id: res.data.user.id,
                                token: res.data.token
                            }, false);

                            setIsLoading(false);
                            Router.push("/");

                        }

                    });

                }

            }).finally(() => setIsLoading(false));

        } 
        
        if (!data.email) {
            setEmailError(true);
            setEmailErrorMessage("Email não pode ser vazio");

        }

        if (!data.confirm_email) {
            setEmailConfirmError(true);
            setConfirmEmailErrorMessage("Confirme seu email");

        } else {
            setEmailConfirmError(false);
            setConfirmEmailErrorMessage("");

        }

    }

    return (
        <main className="bg-gray-back-400 h-register w-full">
            { isLoading && <Spinner messageSpan={spinnerMessage} /> }
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
                </div>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <Input 
                        register={register}
                        name="name"
                        id="name"
                        _type="text"
                        label="Nome"
                        incorrectField={nameError}
                        errorMessage="O nome não pode ser vazio"
                    />
                    <Input 
                        register={register}
                        name="email"
                        id="email"
                        _type="email"
                        label="E-mail"
                        incorrectField={emailError}
                        errorMessage={emailErrorMessage}
                    />
                    <Input 
                        register={register}
                        name="confirm_email"
                        id="confirm_email"
                        _type="email"
                        label="Confirme seu email"
                        incorrectField={emailConfirmError}
                        errorMessage={confirmEmailErrorMessage || emailErrorMessage}
                    />
                    <Input 
                        register={register}
                        name="password"
                        id="password"
                        _type="password"
                        label="Senha"
                        incorrectField={passwordError}
                        errorMessage="A senha não pode ser vazia"
                    />
                    <button 
                        className={classNames(
                            "font-istok-web pt-3 pb-2 px-12 mt-4 rounded-nl text-default font-bold disabled:cursor-not-allowed hover:opacity-90 bg-dark-blue-600 text-dark-orange-600"
                            , { "active:cursor-default active:scale-90": !isLoading }
                        )}
                        disabled={isLoading}
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
                    alt={"Time 7 image, anime naruto"}
                    priority
                    
                />
            </span>
        </main>
    );

}