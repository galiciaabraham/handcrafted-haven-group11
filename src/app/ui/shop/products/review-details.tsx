import { fetchReviewsByProductId } from "@/app/utilities/data";
import React from "react";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import Link from "next/link";
import { auth } from "@/auth";



export default async function ReviewDetails({id}: {id:string}){

    const reviews = await fetchReviewsByProductId(id);
    
    const session = await auth();

    
    let currentUser;
    if (session?.user?.id != undefined){
        currentUser = session.user.id;
    } else currentUser = undefined;

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

                console.log(`User logged: ${currentUser} y es: ${typeof(currentUser)}`)
                
                return (
                <div 
                    key={review.review_id}
                    className="bg-main-2 p-4 rounded-lg text-black my-2 mx-auto w-full" >
                    <div className="flex flex-col md:flex-row justify-between">
                        {review.user_id.toString() === currentUser && (
                        <div className="flex flex-row justify-center mb-4 md:justify-between gap-4 order-1 md:order-2">
                            <Link className="bg-main-1 text-main-2 px-4 w-25 h-10 flex justify-center items-center rounded-md shadow-md md:hover:bg-main-2 md:hover:text-secondary-2" href={`/shop/products/${id}/create-review`}><img src="/images/edit.png" alt="edit symbol" width={25} height={25} className="m-auto" /></Link>
                            <button className="bg-main-1 text-main-2 px-4 w-25 h-10 flex justify-center items-center rounded-md shadow-md md:hover:bg-main-2 md:hover:text-secondary-2"><img src="/images/delete.png" alt="delete symbol" width={25} height={25} className="m-auto"/></button>
                        </div>
                         ) }
                        <div className="order-2 md:order-1 md:mt-4">
                            <Rating
                                style={{ maxWidth: 150, height: 24 }}
                                value={stars}
                                isDisabled
                            />
                        </div>
                    </div>
                    
                    <span className="font-bold">{review.user_name}</span>
                    <span>on {formattedDate}:</span>
                    <p>{review.review_comment}</p>
                </div>)
            })}
        </div>
    );
}