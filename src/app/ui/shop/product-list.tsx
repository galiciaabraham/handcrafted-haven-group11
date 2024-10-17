import Image from "next/image";
import { oswald } from "../fonts";
import { formatCurrency } from "@/app/utilities/formating";


export default function ProductPreview ({
    products, 
} : {
    products: Array<Product>;
}) {
    

    return (
        <>
            {products?.map((product) => (
               <div key={product.product_id} className="flex flex-col justify-center items-center bg-secondary-2 shadow-lg rounded-md p-4 ">
               <div className="flex justify-center items-center w-full">
                 <Image
                   src={product.product_image_url}
                   className="rounded-md shadow-md"
                   width={200}
                   height={200}
                   alt={`${product.product_title}'s product picture`}
                 />
               </div>
               <h2 className={`${oswald.className} text-main-2 p-3`}>{product.product_title}</h2>
               <p className="font-body-text text-main-2 p-3">{formatCurrency(product.product_price)}</p>
               <button className="bg-main-1 text-main-2 p-2 rounded-md shadow-md md:hover:bg-main-2 md:hover:text-secondary-2">Buy</button>
             </div>
             
            ))}
        </>
    )
}
