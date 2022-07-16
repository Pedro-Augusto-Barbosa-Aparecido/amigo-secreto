import { BiSearch } from "react-icons/bi";
import { useForm } from "react-hook-form";

export default function SearchRooms () {
    const { register, handleSubmit } = useForm();
    
    return (
       <section className="p-10 pb-0">
            <h1 className="text-5xl font-istok-web font-bold text-white">Localizar Grupo</h1>
            <form className="w-1/2 mt-6">
                <div className="flex items-center">
                    <input
                        {...register("roomName")}
                        id="roomName"
                        name="roomName"
                        required
                        className="rounded-l-md w-full h-12 outline-none p-4 px-2 text-black"
                    />
                    <button className="flex items-center justify-center w-16 h-12 bg-dark-orange-700 rounded-r-md">
                        <BiSearch 
                            className="text-white text-2xl before:font-extrabold"
                        />
                    </button>
                </div>                
            </form>
       </section>
    );

}