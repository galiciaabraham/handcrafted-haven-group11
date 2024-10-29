import ProfileInfo from "./profile-info";
import { auth } from "@/auth";

export async function getServerSideProps() {
    const session = await auth();
    const userId = session?.user?.id


    return {
        props : {
            userId
        },
    }
 
}

export default async function FetchUserData () {
     const props = await getServerSideProps()
    return (
        <ProfileInfo userId={props.props.userId}/>
    )
}