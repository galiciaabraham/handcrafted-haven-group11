import ProductPreview from '../shop/product-list';
import { fetchAllProducts } from "@/app/utilities/data";


export default async function NewProductWrapper() {
const products = await fetchAllProducts();

const sortedProducts = products.sort((a, b) => new Date(b.product_created_date).getTime() - new Date(a.product_created_date).getTime());
const newProducts = sortedProducts.slice(0,3);


return (
    <>
        <div className='flex flex-col md:flex-row items-center justify-center gap-4'>
            < ProductPreview products={newProducts} />
        </div>
    </>
);
}
