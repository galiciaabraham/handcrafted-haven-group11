import Image from "next/image";
import { oswald } from "../fonts";
import BuyButton from "./products/BuyButton";
import EditProductButton from "@/app/utilities/edit-product-button";

export default function ProductPreview ({
    products, 
} : {
    products: Array<Product>;
}) {
    

    return (
        <>
            {products?.map((product) => (
               <div key={product.product_id} className="relative flex flex-col justify-center items-center bg-secondary-2 shadow-lg rounded-md p-4 ">
                  <div className="flex justify-center items-center w-full">
                    <Image
                      src={`/${product.product_image_url}`}
                      className="rounded-md shadow-md"
                      width={300}
                      height={300}
                      alt={`${product.product_title}'s product picture`}
                    />
                  </div>
                  <h2 className={`${oswald.className} text-main-2 p-3`}>{product.product_title}</h2>
                  <p className="font-body-text text-main-2 p-3">{product.product_price}</p>
                  <BuyButton product_id={product.product_id}/>
                  <EditProductButton product_user_id={product.user_id} product_id={product.product_id} />
                </div>
             
            ))}
        </>
    )
}
