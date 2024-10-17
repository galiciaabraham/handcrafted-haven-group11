import { fetchAllPosts } from "@/app/utilities/data";
import PostsPage from "@/app/ui/feed/PostPage";

export default async function FetchPosts () {
    const posts = await fetchAllPosts();
    return (
        <PostsPage posts={posts}/>
    )
}