
import PostPreview from "@/app/ui/feed/post-list";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";


export default function PostPage({posts, session}:
    {
        posts: Post[],
        session : Session | null ,
    }
) {
    return (
        <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SessionProvider session={session}>
        <PostPreview posts={posts} />
        </SessionProvider>
        </main>
    )
}