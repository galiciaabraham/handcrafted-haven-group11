"use client"

import { useParams } from "next/navigation";
import FormReview from "@/app/ui/shop/products/reviews/create-review-form";


export default async function Page() {
    const params = useParams();
    const [productId] = Array.isArray(params.id) ? params.id : [params.id];
    return (
        <div>
            Chau
            <FormReview productId={productId}></FormReview>
        </div>
    );
}