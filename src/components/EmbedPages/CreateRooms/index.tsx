import { useForm } from "react-hook-form";

export default function CreateRooms () {
    const { register, handleSubmit } = useForm();

    return (
        <section className="w-full font-istok-web text-white flex flex-col justify-start items-start p-8">
            <h2 className="font-semibold text-5xl">Criar Grupo</h2>
            <p className="text-xl font-thin">Informe os dados do novo grupo que deseja criar</p>
            <form className="w-1/3">
                <div className="flex flex-col mt-2">
                    <label className="text-xl" htmlFor="roomName">Nome do Grupo<span className="text-red-500">*</span></label>
                    <input className="rounded-md border-l-8 border-l-dark-orange-700 h-12 outline-none p-4 px-2 text-black" name="roomName" id="roomName" required type={"text"} />
                </div>
                {/* <div>
                    <label>Tipo do Grupo</label>
                    <select>
                        <option>-----------------</option>
                        <option>Amigo Chocolate</option>
                        <option>Normal</option>
                    </select> 
                </div>
                <div>
                    <label>Data do Sorteio</label>
                    <input type={"date"} id="date" name="date" /> 
                </div> */}
            </form>
        </section>
    );

}