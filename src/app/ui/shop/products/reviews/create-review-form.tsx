import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";



export default function FormReview({productId} : {productId:string}){
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = {
            rating,
            comment,
            date: new Date().toISOString(),
            product_id: productId,
            // user_id: userId,
        }
        console.log(formData);
    }
    

    return (
        <div>
            <h2>Add a review</h2>
            <form onSubmit={handleSubmit}>
                
                <label>
                Rating:
                <Rating
                    value={rating}
                    onChange={setRating}
                    style={{ maxWidth: 200 }}
                    isRequired = {true}
                />
                </label>

                <label>
                Comment:
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    maxLength={200}
                    required
                    placeholder="Write your review (max 200 characters)"
                />
                </label>

                <label>
                <input
                    type="hidden"
                    name="date"
                    value={new Date().toISOString()}
                />
                </label>

                <label>
                <input
                    type="hidden"
                    name="product_id"
                    value={productId}
                />
                </label>

                {/* <label>
                <input
                    type="hidden"
                    name="user_id"
                    value="{user_id}"
                />
                </label> */}

                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
}