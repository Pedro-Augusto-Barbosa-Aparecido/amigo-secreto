import { useForm } from "react-hook-form";

export default function CreateRooms () {
    const { register, handleSubmit } = useForm();

    return (
        <section className="w-full font-istok-web text-white flex flex-col justify-start items-start p-8">
            <h2 className="font-semibold text-5xl">Criar Grupo</h2>
            <p className="text-xl mt-4 font-thin">Informe os dados do novo grupo que deseja criar</p>
            {/* <form>
                <div>
                    <label>Nome do Grupo</label>
                    <input name="roomName" id="roomName" type={"text"} />
                </div>
                <div>
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
                </div>
            </form> */}

            <span>Comming...</span>
        </section>
    );

}