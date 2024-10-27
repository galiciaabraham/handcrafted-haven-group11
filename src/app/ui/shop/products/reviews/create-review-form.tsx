import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { createReview, fetchProductDetails } from "@/app/utilities/data";
import { useSession, signIn } from "next-auth/react";

export interface FormReview {
    productId?: string;
    userId?: string;
    reviewRating: number;
    reviewComment: string;
    reviewDate: string;
  }

export default function FormReview({productId, userId} : {productId:string, userId?:string}){
    const [reviewRating, setRating] = useState(0);
    const [reviewComment, setComment] = useState("");
    const [errors, setErrors] = useState<Partial<Record<keyof FormReview, string>>>({});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = {
            reviewRating,
            reviewComment,
            reviewDate: new Date().toISOString(),
            productId: productId,
            userId: userId,
        }

        const result = await createReview(formData);

        if (result?.errors) {
            setErrors(result.errors);
          }
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
                    onChange={setRating}
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
                    onChange={(e) => setComment(e.target.value)}
                    maxLength={200}
                    name={"comment"}
                    required
                    placeholder="Write your review (max 200 characters)"
                    className="block w-full rounded-lg p-2 text-black"
                />
                {errors.reviewComment && <p className="text-red-500 text-sm">{errors.reviewComment}</p>}
                </label>

                <label htmlFor="date">
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
                </label>

                <button className="bg-main-1 text-main-2 px-4 py-2 rounded-md shadow-md md:hover:bg-main-2 md:hover:text-secondary-2 block mx-auto" type="submit">Submit Review</button>
            </form>
        </div>
    );
}