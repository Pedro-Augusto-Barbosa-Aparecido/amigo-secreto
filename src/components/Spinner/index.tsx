import { TailSpin } from "react-loader-spinner";

type SpinnerProps = {
    messageSpan?: string

}

export default function Spinner (props: SpinnerProps) {
    return (
        <div className="absolute text-center flex flex-col items-center justify-center top-1/2 left-1/2">
            <TailSpin 
                color="#F00"
                width={100}
                height={100}
            /> 
            <span className="text-sm text-gray-700 mt-8">{ props.messageSpan } ...</span>
        </div>
    );

}