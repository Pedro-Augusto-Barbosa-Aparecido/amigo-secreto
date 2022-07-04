import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Login () {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

    }

    return (
        <main className="relative h-img-back w-screen">
            <Image 
                src={"/imgs/img-background.png"}
                layout="fill"
                objectFit="fill"
                alt="Background login page, team 7 of naruto"
            />
            <div className="py-10 font-istok-web bg-white absolute w-form-login rounded-nl flex flex-col items-center justify-center right-24 top-14">
                <span className="text-default font-istok-web">Crie seu grupo e</span>
                <span className="text-dark-orange-600 font-bold text-6xl mt-6 font-istok-web">Divirta-se</span>
                <span className="text-lg mt-4 font-normal font-istok-web">Já tem Cadastro? Então faça o seu Login!</span>
                <form onSubmit={handleSubmit}>
                    <input 
                        className="w-full border-sm border-black border-solid pl-4 mt-6 rounded-nl placeholder:text-gray-400 h-in placeholder:align-middle"
                        placeholder="Email..."
                        type={"email"}
                        onChange={ev => setEmail(ev.target.value)}
                        value={email}
                        id="email"
                        name="email"
                        required
                    />
                    <input 
                        className="w-full border-sm border-black border-solid pl-4 mt-6 rounded-nl placeholder:text-gray-400 h-in placeholder:align-middle" 
                        placeholder="Senha..."
                        type={"password"}
                        onChange={ev => setPassword(ev.target.value)}
                        value={password} 
                        id="password" 
                        name="password" 
                        required
                    />
                    <div className="flex items-center justify-center align-middle mt-6">
                        <input className="w-6 h-6" type={"checkbox"} id="remember" name="remember" />
                        <label className="text-dark-orange-600 mt-1 ml-3">Lembre-se de mim</label>
                    </div>
                    <button 
                        className="w-full h-log bg-dark-blue-600 mt-3 rounded-nl text-2xl align-middle p-0 font-istok-web text-dark-orange-600 hover:opacity-90 active:scale-90"
                        type="submit"
                    >
                        LOGIN
                    </button>
                </form>
                <Link href="/">
                    <a className="text-base text-dark-orange-600 mt-6 font-istok-web">Esqueci minha senha</a>
                </Link>
                <Link href="/">
                    <a className="text-dark-blue-600 font-istok-web font-bold text-2xl mt-4">Cadastrar</a>
                </Link>
            </div>
        </main>
    );

}