// import { fetchProductDetails } from "@/app/utilities/data";
import ProductDetails from "@/app/ui/shop/products/product-details";
import SellerDetails from "@/app/ui/shop/products/user-details";
import ReviewDetails from "@/app/ui/shop/products/review-details";

export default async function Page({params}: {params:{id:string}} ) {

    const id = params.id;
    // const productDetails = await fetchProductDetails(id);
    return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-8 gap-8 grid-rows-[auto_1fr]">
        <div className="bg-accent-1 p-4 md:p-6 rounded-lg col-span-1 row-span-2 w-full md:h-full lg:max-w-[80%] m-auto">
            <ProductDetails id={id}/>
        </div>
        <div className="bg-secondary-1 mx-auto w-11/12 h-auto p-10 md:p-4 max-w-xl rounded-lg col-span-1">
            <SellerDetails id={id}/>
        </div>
        <div className="bg-accent-1 p-4 rounded-lg col-span-1 md:col-start-2 w-full lg:max-w-[80%] mx-auto">
            <ReviewDetails id={id}/>
        </div>
    </div>
    )
}