

import { useState } from "react";
import PostPreview from "@/app/ui/feed/post-list";
import { likePost } from "@/app/utilities/data";

export default function PostPage({posts}:
    {
        posts: Post[];
    }
) {


    return (
        <main className="grid grid-cols-1 md:grid-cols-2">
        <PostPreview posts={posts} />
        </main>
    )
}