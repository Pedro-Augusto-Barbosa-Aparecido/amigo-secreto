import { useContext, useState } from "react";

import { AuthContext } from "../../context/Auth";
import { storage } from "../../firebase";

import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

import { getImagePath } from "../../utils/funct";
import { api } from "../../api";

import { CgClose } from "react-icons/cg";
import { RiErrorWarningLine } from "react-icons/ri";

import { useForm } from "react-hook-form";

import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

import { verify } from "jsonwebtoken";

import { parseCookies } from "nookies";

import { Audio } from "react-loader-spinner";

import Image from "next/image";

import styles from "../register/styles.module.css";

import classNames from "classnames";
import Spinner from "../../components/Spinner";
import GetUserController, { User } from "../../database/controllers/User/GetUserController";

import * as Dialog from "@radix-ui/react-dialog";

export interface ProfileProps {
    userExist: boolean
    user?: User

}

export default function Profile (props: ProfileProps) {
    const { user, setUserInfo } = useContext(AuthContext);
    const { query, push } = useRouter();
    const { register, handleSubmit } = useForm();

    const [fileUpload, setFileUpload] = useState<any | null | undefined>("");
    const [messageSpinner, setMessageSpinner] = useState<string>("");
    const [uploadButtonShow, setUploadButtonShow] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<string | null | undefined>(props.user?.avatarUrl);
    const [passwordsNotMatch, setPasswordsNotMatch] = useState<boolean>(false);
    const [showSlider, setShowSlider] = useState<boolean>(false);
    const [passwordChangeModal, setPAsswordChangeModal] = useState<boolean>(false);

    const handleChangeImage = () => {
        if (fileUpload != undefined || fileUpload) {
            const referenceImage = ref(storage, `${getImagePath(user?.id || "")}/${fileUpload.name}`);
            setShowSpinner(true);
            setMessageSpinner("Realizando upload no sistema.");

            uploadBytes(referenceImage, fileUpload).then((response) => {
                setShowSpinner(false);
                setMessageSpinner("Adiquirindo link da imagem.");
                setShowSpinner(true);

                getDownloadURL(response.ref).then((url) => {
                    setShowSpinner(false);
                    setMessageSpinner("Atualizando perfil!");
                    setShowSpinner(true);

                    setUserInfo({
                        name: user?.name || "",
                        email: user?.email || "",
                        id: user?.id || "",
                        token: user?.token || "",
                        avatarUrl: url
                    });

                    api.post("/api/auth/user/update-avatar/", {
                        avatarUrl: url, userId: user?.id
                    }).then((res) => {
                        if (!res.data.success)
                            alert(res.data.err.msg);
                        setProfileImage(url);

                    }).catch((err) => {
                        console.log(err);
                    }).finally(() => {
                        setShowSpinner(false);
                        setUploadButtonShow(false);

                    });
                });
            });

        }

    }

    const handleChangePassword = (data: any) => {
        setPasswordsNotMatch(false);
        setMessageSpinner("Verificando senhas!");
        setShowSlider(true);

        if (data.newPassword !== data.confirmPassword) {
            setShowSlider(false);
            setPasswordsNotMatch(true);
            return;

        }

        setShowSlider(false);
        setMessageSpinner("Atualizando senha!");
        setShowSlider(true);

        api.post("/api/auth/user/update-password/", {
            newPassword: data.newPassword,
            userId: user?.id
        }).then((res) => {
            if (!res.data.success)
                alert("Não foi possivel atualizar a senha");
            else
                alert("Senha atualizada com sucesso!");

        }).finally(() => {
            setShowSlider(false)
            setPAsswordChangeModal(false);

        });

    }

    if (!props.userExist) {
        return (
            <main className="pt-16 px-12">
                <h1 className="text-5xl text-dark-orange-700">User <span className="text-red-600">{ query.id }</span>, not exist!</h1>
                <button onClick={
                    () => push("/")
                } className="py-1 px-4 mt-8 active:scale-90 active:cursor-default hover:opacity-80 bg-dark-orange-700 rounded-lg text-white text-xl font-istok-web font-extrabold">
                    Back to Home
                </button>
            </main>
        );

    }

    return (
        <div>
            <div className={
                classNames(
                    "",
                    { "hidden": !showSpinner }
                )
            }>
                <Spinner 
                    messageSpan={messageSpinner}
                    
                />
            </div>
            <div className="p-12 pt-16">
                <h1 className="text-5xl text-dark-orange-700 font-istok-web font-extrabold">Minha Conta</h1>
                <div className="mt-8 rounded-full flex items-center">
                    <div className="">
                        <Image 
                            width={125}
                            height={125}
                            src={profileImage ? profileImage : "/imgs/default-login-image.png"}
                            alt="User profile"
                            priority
                            className="rounded-full"
                        />
                    </div>
                    <button
                        className={
                            classNames(
                                "py-1 px-4 ml-8 active:scale-90 active:cursor-default hover:opacity-80 bg-dark-orange-700 rounded-lg text-white text-xl font-istok-web font-extrabold",
                                { "hidden": props.user?.id != user?.id }
                            )
                        }
                        onClick={() => {
                            document.getElementById("file-uploader")?.click();
                        }}
                    >
                        Alterar Foto
                        <input 
                             type={"file"}
                             id="file-uploader"
                             className="hidden"                             
                             onChange={event => {
                                // @ts-ignore
                                setFileUpload(event.target.files[0]);
                                setUploadButtonShow(true);
                            
                             }}
                             accept={"image/png, image/jpg, image/gif, image/jpeg"}
                        /> 
                    </button>    
                    <button 
                        onClick={handleChangeImage} 
                        className={classNames(
                            "py-1 px-4 ml-4 active:scale-90 active:cursor-default hover:opacity-80 bg-dark-orange-700 rounded-lg text-white text-xl font-istok-web font-extrabold", 
                            { "hidden": !uploadButtonShow }
                        )}
                    >
                        Upload Image
                    </button>                     
                </div>
                <section className="flex flex-col mt-8 cursor-text">
                    <span className="text-2xl font-istok-web text-dark-orange-700">Nome</span>
                    <span className="text-lg text-black font-normal font-istok-web">{ props.user?.name }</span>
                    <span className="text-2xl font-istok-web text-dark-orange-700 mt-4">Email</span>
                    <span className="text-lg text-black font-normal font-istok-web">{ props.user?.email }</span>
                </section>
                <div className={
                    classNames(
                        "mt-12",
                        { "hidden": props.user?.id != user?.id }
                    )
                }>
                    <Dialog.Root open={passwordChangeModal}>
                        <Dialog.Trigger>
                            <button 
                                className="py-1 px-4 active:scale-90 active:cursor-default hover:opacity-80 bg-dark-orange-700 rounded-lg text-white text-xl font-istok-web font-semibold"
                                onClick={() => {
                                    setPAsswordChangeModal(true);
                                }}
                            >
                                Alterar Senha
                            </button>
                        </Dialog.Trigger>
                        <Dialog.Content>
                            <div className="absolute z-50 top-0 left-0 w-full h-screen bg-gray-700 bg-opacity-70 flex items-center justify-center">
                                <form 
                                    className="p-4 w-96 z-50 bg-white rounded-md shadow-md"
                                    onSubmit={handleSubmit(handleChangePassword)}
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h1 className="text-3xl text-dark-orange-700">Trocar senha!</h1>
                                        <Dialog.Close>
                                            <CgClose onClick={() => setPAsswordChangeModal(false)} className="text-2xl hover:scale-125 active:scale-90" />
                                        </Dialog.Close>
                                    </div>
                                    <div className="flex flex-col mb-4">
                                        <label 
                                            htmlFor="newPassword"
                                            className="text-xl mr-4"
                                        >
                                            Nova Senha: 
                                        </label>
                                        <input 
                                            {...register("newPassword")}
                                            id="newPassword"
                                            name="newPassword"
                                            type={"password"}
                                            className="p-2 outline-none border-black border rounded"
                                            required
                                        />
                                        <div className={
                                            classNames(
                                                "flex items-center justify-start text-red-700 font-istok-web", 
                                                { "hidden": !passwordsNotMatch }
                                            )
                                        }>
                                            <RiErrorWarningLine />
                                            <span className="ml-2 mt-1">As senhas não batem</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col mb-4">
                                        <label 
                                            htmlFor="confirmPassword"
                                            className="text-xl mr-4"
                                        >
                                            Confirme a Senha: 
                                        </label>
                                        <input 
                                            {...register("confirmPassword")}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={"password"}
                                            className="p-2 outline-none border-black border rounded"
                                            required
                                        />
                                        <div className={
                                            classNames(
                                                "flex items-center justify-start text-red-700 font-istok-web", 
                                                { "hidden": !passwordsNotMatch }
                                            )
                                        }>
                                            <RiErrorWarningLine />
                                            <span className="ml-2 mt-1">As senhas não batem</span>
                                        </div>
                                    </div>
                                    <div className={
                                        classNames(
                                            "w-full flex flex-col items-center justify-center",
                                            { "hidden": !showSlider }
                                        )
                                    }>
                                        <Audio 
                                            color="#F00"
                                            height={30}
                                        />
                                        <span>{ messageSpinner }</span>
                                    </div>
                                    <button
                                        className="py-2 px-4 mt-3 w-full active:scale-90 active:cursor-default hover:opacity-80 bg-dark-orange-700 rounded-lg text-white text-xl font-istok-web font-semibold"
                                        type="submit"
                                    >
                                        Alterar a senha
                                    </button>
                                </form>
                            </div>
                        </Dialog.Content>
                    </Dialog.Root>
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
        </div>
    );

}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { 'nextauth.token': token } = await parseCookies(ctx);

    if (!token)
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }

    try {
      verify(token, process.env.TOKEN_KEY || "");

    } catch (err) {
      return {
        redirect: {
          destination: "/login",
          permanent: false
        }
      }
    }

    const { id } = ctx.query;   
    const userController = new GetUserController();

    const user = await userController.get({ id: id?.toString() });

    if (user.userNotExist) {
        return {
            props: {
                userExist: false
            }

        }

    }

    return {
        props: {
            userExist: true,
            user: user.user
        }

    }

}
