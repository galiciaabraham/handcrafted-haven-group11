import Image from 'next/image';
import ProductPreview from '../shop/product-list';
import { fetchAllProducts } from "@/app/utilities/data";


export default async function NewProductWrapper() {
// const { newProduct } = await fetchNewProducts(); <= array?
const newProducts = await fetchAllProducts();
return (
    <>
        <div className='flex flex-col md:flex-row items-center justify-center gap-4'>
            < ProductPreview products={newProducts} />
        </div>
    </>
);
}
