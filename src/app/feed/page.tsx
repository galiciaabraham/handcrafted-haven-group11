import { Suspense } from "react";
import FetchPosts from "@/app/ui/feed/FetchPosts";

export default function Page() {
    return (
        <>
          <>
    <Suspense>
    <FetchPosts />
    </Suspense>
    </>  
        </>
    )
}