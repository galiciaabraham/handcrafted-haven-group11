import ProfileInfo from "./profile-info";
import { auth } from "@/auth";
import { fetchUserPosts } from "@/app/utilities/data";
import PostPreview from "../feed/post-list";

export async function getServerSideProps() {
    const session = await auth();
    const userId = session?.user?.id
    const userPosts = await fetchUserPosts(userId);

    return {
        props : {
            userPosts
        },
    }
 
}

export default async function FetchUserPosts () {
     const props = await getServerSideProps()
    //console.log(props)
    return (
        <PostPreview posts={props.props.userPosts}/>
    )
}