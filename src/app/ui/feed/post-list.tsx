'use client';

import { useState, useEffect } from "react";
import { likePost, checkIfLiked, sumLikes } from "@/app/utilities/data";
import LikeButton from "@/app/utilities/like-button";
import { useSession } from "next-auth/react";

export default function PostPreview({posts}: {
    posts: Array<Post>,
}) {
    const [renderedPosts, setRenderedPosts] = useState(posts);
    //const { data : session } = useSession()
    const session = false;
    //console.log('This is the users email', session?.user?.email);
    const [isDisabled, setDisabled] = useState(true);

    useEffect(() => {
        if (!session) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [session]);
        
    const handleLikeChange = async (post_id: number)  => {
        
        const updatedPosts = await Promise.all(
            renderedPosts.map(
                async post =>{
                    //const user_id = session?.user?.id;
                    const user_id = 6;
                    if (post.post_id === post_id) {
                        console.log('This is the post id', post_id);
                        const alreadyLiked = await checkIfLiked({user_id, post_id});
                        if (!alreadyLiked) {
                        await likePost({user_id, post_id})
                        const newLikesCount = await sumLikes({post_id});
                        return { ...post, post_likes_count: newLikesCount };
                        }
                    }
                    return post;
        }));
        setRenderedPosts(updatedPosts);
    }

    return (   
        <>
        {renderedPosts?.map((post) => (
            <div key={post.post_id} className=" relative m-4 bg-main-2 p-4 rounded-md shadow-md">
                <h2 className=" text-secondary-2 text-titles w-22 font-bold">{post.post_title}</h2>
                <p className="font-body-text text-secondary-2 p-4 w-30">{post.post_content}</p>
                <span className="font-body-text text-secondary-2 p-3 absolute right-4 top-5">{new Intl.DateTimeFormat('en-US').format(post.post_create_at)}</span>
                <LikeButton onClickLike={async () => await handleLikeChange(post.post_id)} isDisabled={isDisabled} />
                
                <span id="likes-count" className="font-body-text text-main-2 bg-main-1 font-extrabold p-1 absolute right-2 bottom-1 rounded-full border">{post.post_likes_count}</span>

            </div>
        ))}
            
        </>   
    )
}