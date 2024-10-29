import { Suspense } from "react";
import FetchPosts from "@/app/ui/feed/FetchPosts";
import AddPostButton from "@/app/ui/feed/AddPostButton"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Post Feed`,
  }

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