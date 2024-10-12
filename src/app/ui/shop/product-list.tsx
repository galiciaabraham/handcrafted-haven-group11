import Image from "next/image";
import { fetchAllProducts } from "@/app/utilities/data";

export default async function ProductList () {
    const products = await fetchAllProducts();

    return (
        <div className="grid-cols-3 m-4 place-items-center">
            {products?.map((product) => (
               <div className="flex-col items-center justify-center bg-secondary-2 shadow-lg">
                    <Image 
                        src={product.image_url}
                        className="mr-2 rounded-md m-4 shadow-md"
                        width={500}
                        height={500}
                        alt={`${product.title}'s profile picture`}
                    />
                    <h2 className="font-titles text-main-2 p-3">{product.title}</h2>
                    <p className="font-body-text text-main-2 p-3">{product.description}</p>
                    <p>{product.price}</p>
                    <button>Buy</button>
               </div> 
            ))}
        </div>
    )
}