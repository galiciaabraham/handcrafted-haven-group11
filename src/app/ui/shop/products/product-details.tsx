import { fetchProductDetails } from "@/app/utilities/data";
import Image from "next/image";
import Link from "next/link";

export default async function ProductDetails({id}: {id:string}){

    const productDetails = await fetchProductDetails(id);
    const {product_title, product_price, product_description, product_image_url, user_id} = productDetails;
    return(
        <div className="bg-main-2 p-4 md:p-6 rounded-lg text-black text-center">
            <h1 className="font-titles text-4xl font-bold mb-4">Product Details</h1>
            <div className="max-w-lg mx-auto">
                <Image src={`/${product_image_url}`} width={300} height={300} alt={`Picture of ${product_title}`} className="w-full h-auto object-fill rounded-lg" />
            </div>
            <div className="grid grid-cols-3 gap-5 my-8 mx-2 items-center">
                <h1 className="font-titles text-2xl md:text-3xl col-span-2 font-bold">{product_title}</h1>
                <span className="col-span-1 col-start-3 text-center text-1xl md:text-2xl font-bold">{`$${product_price}`}</span>
                <p className="col-span-2">{product_description}</p>
                <Link className="bg-main-1 text-main-2 p-2 rounded-md shadow-md h-10 md:hover:bg-main-2 md:hover:text-secondary-2 col-span-1 col-start-3" href={`/shop/contact/${user_id}`}>Buy</Link>
            </div>
        </div>
    );
}