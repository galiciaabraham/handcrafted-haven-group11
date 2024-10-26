import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function LoginButton() {
    const { data: session, status } = useSession();
    
    if (status === "authenticated" && session?.user) {
        return (
            <div>
                <button
                    onClick={() => signOut()}
                    className="font-text text-main-2 bg-secondary-2 shadow-lg hover:bg-main-2 hover:text-secondary-2 hover:shadow-lg font-medium rounded-md text-sm px-4 py-2 text-center"
                >
                    Logout
                </button>
                <Link
                    href={`/profile/${session.user?.id}`}
                    className="font-text text-main-2 bg-secondary-2 shadow-lg hover:bg-main-2 hover:text-secondary-2 hover:shadow-lg font-medium rounded-md text-sm px-4 py-2 text-center"
                >
                    Profile
                </Link>
            </div>
        );
    } else {
        return (
            <Link
                href="/login"
                className="font-text text-main-2 bg-secondary-2 shadow-lg hover:bg-main-2 hover:text-secondary-2 hover:shadow-lg font-medium rounded-md text-sm px-4 py-2 text-center"
            >
                Login
            </Link>
        );
    }
}
