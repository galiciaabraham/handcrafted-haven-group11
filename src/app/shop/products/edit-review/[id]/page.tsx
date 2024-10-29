import FormReviewEdit from "@/app/ui/shop/products/reviews/edit-review-form";
import { fetchReviewByReviewId } from "@/app/utilities/data";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Edit Review`,
  }
interface Params {
    id: string; 
}

export default async function Page({params}:{params:Params}) {
    const {id} = params;
    const session = await auth();

    if (id) {
        const reviews = await fetchReviewByReviewId(id);
        const review = reviews[0];

        if (session?.user?.id === review?.user_id.toString()) {
            return (
                <div className="w-full">
                    <h2>Welcome, User ID: {session.user.name}</h2>
                    <FormReviewEdit review={review} />
                </div>
            );
        } else {
            return <div>You are not authorized to edit this review or the review ID does not exist.</div>;
        }
    } else {
        return <div>No review found.</div>;
    }
}