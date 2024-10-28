import PostPreview from '@/app/ui/feed/post-list';
import { fetchAllPosts, fetchAllProducts } from "@/app/utilities/data";


export default async function HighlightWrapper() {
const posts = await fetchAllPosts();

const sortedPosts = posts.sort((a, b) => new Date(b.post_create_at).getTime() - new Date(a.post_create_at).getTime());
const recentPosts = sortedPosts.slice(0,2);


return (
    <>
        <div className="items-center justify-center gap-5">
            < PostPreview posts={recentPosts} />
        </div>
    </>
);
}
