"use client"
import { useSearchParams } from "next/navigation";
import { useSession} from "next-auth/react";
import FormReviewEdit from "@/app/ui/shop/products/reviews/edit-review-form";
import { fetchReviewByReviewId } from "@/app/utilities/data";
import { useEffect, useState } from "react";
import { Review } from "@/app/utilities/definitions";

export default async function Page() {
    const params = useSearchParams();
    const reviewId = params.get("id");
    const {data: session, status} = useSession();
    const [review, setReview] = useState<Review | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (reviewId) {
            const fetchReview = async () => {
                try {
                    const reviews = await fetchReviewByReviewId(reviewId);
                    setReview(reviews[0]); // Assuming reviews is an array
                } catch (error) {
                    console.error('Failed to fetch review:', error);
                } finally {
                    setLoading(false); // Set loading to false once done
                }
            };

            fetchReview(); // Call the async function
        } else {
            setLoading(false); // Set loading to false if there is no reviewId
        }
    }, [reviewId]);

    if (status === "loading"){
        return <p>Loading...</p>;
    }

    if (status === "authenticated" && session?.user?.id) {
        if (review?.user_id === session.user.id) {
            return (
                <div className="w-full">
                    <h2>Welcome, User ID: {session.user.name}</h2>
                    <FormReviewEdit review={review} />
                </div>
            );
        } else {
            return <div>You are not authorized to edit this review.</div>;
        }
    } else {
        return <div>Please log in to be able to edit this review.</div>;
    }
}