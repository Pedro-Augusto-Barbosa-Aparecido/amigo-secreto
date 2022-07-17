import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getImagePath } from "../../utils/funct";
import { api } from "../../api";

import Image from "next/image";

import styles from "../register/styles.module.css";

import classNames from "classnames";
import Spinner from "../../components/Spinner";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import GetUserController from "../../database/controllers/User/GetUserController";

export interface ProfileProps {
    userExist: boolean

}

export default function Profile (props: ProfileProps) {
    const { user, setUserInfo } = useContext(AuthContext);

    const [fileUpload, setFileUpload] = useState<any | null | undefined>("");
    const [messageSpinner, setMessageSpinner] = useState<string>("");
    const [uploadButtonShow, setUploadButtonShow] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

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

    if (!props.userExist) {
        const { query, push } = useRouter();

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
                            src={user?.avatarUrl ? user.avatarUrl : "/imgs/default-login-image.png"}
                            alt="User profile"
                            priority
                            className="rounded-full"
                        />
                    </div>
                    <button
                        className="py-1 px-4 ml-8 active:scale-90 active:cursor-default hover:opacity-80 bg-dark-orange-700 rounded-lg text-white text-xl font-istok-web font-extrabold"
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
                    <span className="text-lg text-black font-normal font-istok-web">{ user?.name }</span>
                    <span className="text-2xl font-istok-web text-dark-orange-700 mt-4">Email</span>
                    <span className="text-lg text-black font-normal font-istok-web">{ user?.email }</span>
                </section>
                <button className="py-1 px-4 absolute top-3/4 active:scale-90 active:cursor-default hover:opacity-80 bg-dark-orange-700 rounded-lg text-white text-xl font-istok-web font-semibold">
                    Alterar Senha
                </button>
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
            userExist: true
        }

    }

}
