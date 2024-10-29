import Link from "next/link"


export default function Login(){
    return (
        <>
        <Link
            href="/login"
            className="font-text text-main-2 bg-secondary-2 shadow-lg hover:bg-main-2 hover:text-secondary-2 hover:shadow-lg font-medium rounded-md text-sm px-4 py-2 text-center"
        >
            Login
        </Link>
        <Link
        href="/register"
        className="font-text text-main-2 bg-secondary-2 shadow-lg hover:bg-main-2 hover:text-secondary-2 hover:shadow-lg font-medium rounded-md text-sm px-4 py-2 text-center"
    >
        Register
    </Link>
</>
    )
}