import classNames from "classnames"
import { HiOutlineExclamationCircle } from "react-icons/hi"

export type InputProps = {
    label: string
    name: string
    id: string
    _type: string
    register: any
    incorrectField: boolean
    errorMessage?: string
    readOnly?: boolean 
}

export default function Input ({ label, id, name, _type, register, incorrectField, errorMessage, readOnly }: InputProps) {
    return (
        <div className="flex flex-col w-1/3 mt-4">
            <label 
                className="font-istok-web text-dark-blue-600 text-2xl"
            >
                { label }
            </label>
            <input
                {...register(name)}
                className={
                    classNames(
                        "border-l-st border-l-dark-orange-600 w-full border-sm border-black border-solid pl-4 mt-1 rounded-nl h-in",
                        { 'border-red-600': incorrectField }
                    )
                }
                id={id}
                name={name}
                type={_type} 
                readOnly={readOnly}
            />
            <div 
                className={classNames(
                    "flex items-center justify-start ml-2",
                    { 'hidden': !incorrectField }
                )}
            >
                <HiOutlineExclamationCircle className="text-red-600 mr-1" />
                <span className="mt-0.5 text-red-600">{ errorMessage }</span>
            </div>
        </div>
    );

}