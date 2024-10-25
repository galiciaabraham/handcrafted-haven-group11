import { fetchReviewsByProductId } from "@/app/utilities/data";
import React from "react";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import Link from "next/link";

export default async function ReviewDetails({id}: {id:string}){

    const reviews = await fetchReviewsByProductId(id);
 
    // const {review_comment, review_rating, review_created_date, user_name} = reviewDetails;

    return(
        <div className="flex flex-col w-full">
            <div className="flex justify-between items-center h-16 mb-4 lg:mb-0">
            <h1 className="font-titles text-4xl font-bold mb-4 text-black text-center my-auto">Product Reviews</h1>
            <Link className="bg-main-1 text-main-2 w-10 h-10 flex justify-center items-center rounded-md shadow-md md:hover:bg-main-2 md:hover:text-secondary-2" href={`/shop/products/${id}/create-review`}>+</Link>
            </div>
            
            {reviews?.map((review) => {
                const reviewDate = new Date(review.review_created_date);
                const formattedDate = reviewDate.toLocaleDateString();

                const stars = parseInt(review.review_rating);
                return (<div 
                    key={review.review_id}
                    className="bg-main-2 p-4 rounded-lg text-black my-2 mx-auto w-full" >
                    <div>
                        <Rating
                            style={{ maxWidth: 150, height: 24 }}
                            value={stars}
                            isDisabled
                        />
                    </div>
                    <span className="font-bold">{review.user_name}</span>
                    <span>on {formattedDate}:</span>
                    <p>{review.review_comment}</p>
                </div>)
            })}
        </div>
    );
}