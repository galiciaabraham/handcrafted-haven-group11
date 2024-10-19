'use client';

import { useState } from "react";
import { likePost } from "@/app/utilities/data";
import LikeButton from "@/app/utilities/like-button"

export default function PostPreview({posts}: {
    posts: Array<Post>,
    //onClickLike : (post_id: number) => void;
}) {
    const [renderedPosts, setRenderedPosts] = useState(posts);

    const handleLikeChange = async (post_id: number)  => {
        console.log(`These are the pre-rendered posts`);
        console.log(posts)
        const updatedPosts = await Promise.all(renderedPosts.map(async post =>{
            if (post.post_id === post_id) {
                console.log(`This is the post_id: ${post_id}`)
                console.log(`This is the post.post_id: ${post.post_id}` );
                const newLikesCount = post.post_likes_count + 1;
                console.log('This is the likesCount after clicked', newLikesCount)
                await likePost({ post_id, likesCount: newLikesCount });
                return { ...post, post_likes_count: newLikesCount };
            }
            return post;
        }));
        setRenderedPosts(updatedPosts);
        console.log(`These are the rendered posts`);
        console.log(renderedPosts);
    }

    return (   
        <>
        {renderedPosts?.map((post) => (
            <div key={post.post_id} className=" relative m-4 bg-main-2 p-4 rounded-md shadow-md">
                <h2 className=" text-secondary-2 text-titles">{post.post_title}</h2>
                <p className="font-body-text text-secondary-2 p-3">{post.post_content}</p>
                <span className="font-body-text text-secondary-2 p-3 absolute right-4 top-2">{new Intl.DateTimeFormat('en-US').format(post.post_create_at)}</span>
                <LikeButton onClickLike={async () => await handleLikeChange(post.post_id)} />
                
                <span id="likes-count" className="font-body-text text-main-2 bg-main-1 font-extrabold p-1 absolute right-2 bottom-1 rounded-full border">{post.post_likes_count}</span>

            </div>
        ))}
            
        </>   
    )
}