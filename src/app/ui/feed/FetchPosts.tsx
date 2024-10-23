import { fetchAllPosts } from "@/app/utilities/data";
import PostsPage from "@/app/ui/feed/PostPage";
import { auth } from "@/auth";

export async function getServerSideProps() {
    const session = await auth();
    const posts = await fetchAllPosts();

    return {
        props : {
            session,
            posts,
        },
    }
 
}

export default async function FetchPosts () {
     const props = await getServerSideProps()
    
    return (
        <PostsPage posts={props.props.posts} session={props.props.session}/>
    )
}