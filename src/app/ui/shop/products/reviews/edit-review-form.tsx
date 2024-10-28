import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Review } from "@/app/utilities/definitions";
import { updateReview } from "@/app/utilities/data";

export interface FormReviewEdit {
    reviewId:number;
    reviewRating: number;
    reviewComment: string;
  }

export default function FormReviewEdit({review} : {review:Review|undefined}){
    const [reviewId, setReviewId] = useState<number>();
    const [reviewRating, setReviewRating] = useState<number>(review ? parseInt(review.review_rating) : 1);
    const [reviewComment, setReviewComment] = useState<string>("");
    const [errors, setErrors] = useState<{ reviewRating?: string; reviewComment?: string }>({});

    useEffect(() => {
        if (review) {
            setReviewId(parseInt(review.review_id));
            setReviewRating(parseInt(review.review_rating));
            setReviewComment(review.review_comment);
        }
    }, [review]);

   

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (reviewId !== undefined && reviewRating !== undefined) {
        const formData = {
            reviewId,
            reviewRating,
            reviewComment,
        }

        const result = await updateReview(formData);
        if (result?.errors) {
            setErrors(result.errors);
          }
        } else throw new Error("Error while trying to update.");
        
    }
    

    return (
        <div className=" w-full max-w-[80%] md:max-w-[400px] mx-auto my-8 flex flex-col p-4 bg-main-1 bg-opacity-40 rounded-lg">
            <h2 className="font-titles text-3xl text-center">Create Review</h2>
            <form onSubmit={handleSubmit}>
                
                <label className="mb-5 mt-5 block text-xs font-medium "
                htmlFor="rating">
                Rating:
                <Rating
                    value={reviewRating}
                    onChange={setReviewRating}
                    style={{ maxWidth: 200 }}
                    isRequired = {true}
                />
                  {errors.reviewRating && <p className="text-red-500 text-sm">{errors.reviewRating}</p>}
                </label>

                <label className="mb-5 mt-5 block text-xs font-medium"
                htmlFor="comment">
                Comment:
                <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    maxLength={200}
                    name={"comment"}
                    required
                    placeholder="Write your review (max 200 characters)"
                    className="block w-full rounded-lg p-2 text-black"
                />
                {errors.reviewComment && <p className="text-red-500 text-sm">{errors.reviewComment}</p>}
                </label>

                {/* <label htmlFor="date">
                <input
                    type="hidden"
                    name="date"
                    value={new Date().toISOString()}
                />
                </label>

                <label htmlFor="productId">
                <input 
                    type="hidden"
                    name="productId"
                    value={productId}
                />
                </label>

                <label htmlFor="user_id">
                <input
                    type="hidden"
                    name="user_id"
                    value={userId}
                />
                </label> */}

                <button className="bg-main-1 text-main-2 px-4 py-2 rounded-md shadow-md md:hover:bg-main-2 md:hover:text-secondary-2 block mx-auto" type="submit">Submit Review</button>
            </form>
        </div>
    );
}