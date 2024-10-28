
import PostPreview from "@/app/ui/feed/post-list";
import { Session } from "next-auth";


export default function PostPage({posts, session}:
    {
        posts: Post[],
        session : Session | null ,
    }
) {
    return (
        <main className="grid grid-cols-1 md:grid-cols-2 gap-4 m-5 mb-20">
        <PostPreview posts={posts} />
        </main>
    )
}