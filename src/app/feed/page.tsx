import { Suspense } from "react";
import FetchPosts from "@/app/ui/feed/FetchPosts";
import AddPostButton from "@/app/ui/feed/AddPostButton"

export default function Page() {

    return (
        <>
          <>
    <Suspense>
    <FetchPosts />
    </Suspense>
    <div id="add-post-button" className="relative m-5">
    <AddPostButton/>
    </div>
    </>  
        </>
    )
}