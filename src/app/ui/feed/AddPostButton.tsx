'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
//import { useSession } from "next-auth/react";



export default function AddPostButton() {
    const [isHidden, setHidden] = useState(false);
    //const { data : session } = useSession()
    const session = false;
    const router = useRouter();

        useEffect(() => {
            if (session) {
                setHidden(true);
            } else {
                setHidden(false);
            }
        }, [session]); 

    return (
        
        <>
            <button onClick={()=> {
                console.log('Clicked and redirected')
                router.push('/feed/create-post');
                }} type="button" className={`m-4 bg-main-1 text-main-2 border border-main-2 md:hover:bg-secondary-1 md:hover:text-main-2 font-medium rounded-full text-md p-2.5 text-center inline-flex items-center me-2 shadow-md absolute right-4 bottom-4 disabled:text-black disabled:bg-accent-1 disabled:hover:bg-accent-1 disabled:hover:text-black disabled:border-black ${isHidden ? "hidden" : ""}`} >
            Add Post
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f8f8f8"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
            </button>
        </>
    )
}