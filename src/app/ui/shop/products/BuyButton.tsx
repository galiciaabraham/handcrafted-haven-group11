'use client';
import { useRouter } from "next/navigation";

export default function BuyButton({product_id}: {product_id : number}) {
    const route = useRouter();
    const stringProductId = product_id.toString();
    return (
        
        <>
        <button onClick={()=> {
            console.log('Clicked and redirected')
            route.push(`/shop/products/${stringProductId}`);
            }} className="bg-main-1 text-main-2 p-2 rounded-md shadow-md md:hover:bg-main-2 md:hover:text-secondary-2">Buy
            </button>
        </>
    )
}