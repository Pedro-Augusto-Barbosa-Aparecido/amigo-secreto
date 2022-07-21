import { TailSpin } from "react-loader-spinner";

type SpinnerProps = {
    messageSpan?: string

}

export default function Spinner (props: SpinnerProps) {
    return (
        <div className="absolute bg-gray-back-100 bg-opacity-80 text-center flex flex-col items-center justify-center top-0 left-0 h-full w-full">
            <TailSpin 
                color="#F00"
                width={100}
                height={100}
            /> 
            <span className="text-xl font-semibold text-black mt-8">{ props.messageSpan + "..."}</span>
        </div>
    );

}