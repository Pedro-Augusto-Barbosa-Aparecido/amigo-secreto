import Link from "next/link";

export default function Footer () {
    return (
        <footer className="absolute bottom-0 font-istok-web h-12 w-full bg-dark-orange-700 flex items-center justify-center">
            <Link href="/">
                <a className="text-lg">
                    © www.konan.vercel.app - 2022
                </a>
            </Link>
        </footer>
    );
    
}