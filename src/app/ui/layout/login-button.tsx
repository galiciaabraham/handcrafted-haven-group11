import { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import Login from "./login";
import Logout from "./logout";

export default function LoginButton() {
    const { data: session, status } = useSession();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession();
            setIsLoggedIn(!!session);
        };

        checkSession();
        const intervalId = setInterval(checkSession, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return isLoggedIn ? <Logout session={session} /> : <Login />;
}
