// import { fetchProductDetails } from "@/app/utilities/data";
import ProductDetails from "@/app/ui/shop/products/product-details";
import SellerDetails from "@/app/ui/shop/products/user-details";
import ReviewDetails from "@/app/ui/shop/products/review-details";
import { Suspense } from "react";
import { fetchReviewsByProductId } from "@/app/utilities/data";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Product Information`,
  }

export default async function Page({params}: {params:{id:string}} ) {

    const id = params.id;
    const reviews = await fetchReviewsByProductId(id);

    // const productDetails = await fetchProductDetails(id);
    return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-8 gap-8 grid-rows-[auto_1fr] align-top">
        <div className="bg-accent-1 p-4 md:p-6 rounded-lg col-span-1 row-span-2 w-full lg:max-w-[80%] mx-auto max-h-fit">
            <Suspense fallback={<div>Loading product information...</div>}>
                <ProductDetails id={id}/>
            </Suspense> 
        </div>
        <div className="bg-secondary-1 mx-auto w-11/12 h-auto p-10 md:p-4 max-w-xl rounded-lg col-span-1">
            <Suspense fallback={<div>Loading Artist information...</div>}>
                <SellerDetails id={id}/>        
            </Suspense>
        </div>
        <div className="bg-accent-1 p-4 rounded-lg col-span-1 md:col-start-2 w-full lg:max-w-[80%] mx-auto md:h-full">
            <Suspense fallback={<div>Loading reviews...</div>}>
                <ReviewDetails id={id} reviews={reviews}/>
            </Suspense>
        </div>
    </div>
    )
}