"use client"

import { useParams } from "next/navigation";
import FormReview from "@/app/ui/shop/products/reviews/create-review-form";
import { useSession} from "next-auth/react";

export default function Page() {
    const params = useParams();
    const [productId] = Array.isArray(params.id) ? params.id : [params.id];
    const {data: session, status} = useSession();

    
    if (status === "loading"){
        return <p>Loading...</p>;
    }
    console.log(session);
    console.log(`Status: ${status}`);
    if (status === "authenticated" && session?.user?.id){
        console.log("User ID: ", session);
        return (
            <div className="w-full">
                
                <FormReview productId={productId} userId={session.user.id}></FormReview>
            </div>
        );
    } else {
        return <div className="m-4 p-4 text-center font-bold">No user session available. Please log in.</div>;
    }
}