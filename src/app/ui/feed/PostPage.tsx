'use client';

import { useState } from "react";
import PostPreview from "@/app/ui/feed/post-list";
import { likePost } from "@/app/utilities/data";

export default function PostPage({posts}:
    {
        posts: Post[];
    }
) {
    const [renderedPosts, setRenderedPosts] = useState(posts);

    const handleLikeChange = (post_id: number) => {
        const updatedPosts = renderedPosts.map(post => {
            if (post.post_id === post_id) {
                const newLikesCount = post.post_likes_count + 1;
                likePost({ post_id, likesCount: newLikesCount });
                return { ...post, post_likes_count: newLikesCount };
            }
            return post;
        });
        setRenderedPosts(updatedPosts);
    }


    return (
        <main className="grid grid-cols-1 md:grid-cols-2">
        <PostPreview posts={renderedPosts} onClickLike={handleLikeChange} />
        </main>
    )
}