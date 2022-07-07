export type InputProps = {
    label: string
    name: string
    id: string
    _type: string
    register: any
}

export default function Input ({ label, id, name, _type, register }: InputProps) {
    return (
        <div className="flex flex-col w-1/3 mt-4">
            <label 
                className="font-istok-web text-dark-blue-600 text-2xl"
            >
                { label }
            </label>
            <input
                {...register(name)}
                className="border-l-st border-l-dark-orange-600 w-full border-sm border-black border-solid pl-4 mt-1 rounded-nl h-in"
                id={id}
                name={name}
                type={_type} 
            />
        </div>
    );

}