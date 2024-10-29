import { auth } from "@/auth";
import { fetchReviewsByUserId } from "@/app/utilities/data";
//import ReviewDetails from "../shop/products/review-details";
import ProfileReviewCards from "./ReviewCards";

export async function getServerSideProps() {
    const session = await auth();
    const userId : any = session?.user?.id
    const userReviews = await fetchReviewsByUserId(userId);

    return {
        props : {
            userId,
            userReviews
        },
    }
 
}

export default async function FetchUserReviews () {
     const props = await getServerSideProps()
    return (
        
        <ProfileReviewCards id={props.props.userId} reviews={props.props.userReviews}/>
    )
}