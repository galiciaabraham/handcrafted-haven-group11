import PostPreview from "@/app/ui/feed/post-list";

export default function PostPage({posts}:
    {
        posts: Post[];
    }
) {
    return (
        <>
        <PostPreview posts={posts} />
        </>
    )
}