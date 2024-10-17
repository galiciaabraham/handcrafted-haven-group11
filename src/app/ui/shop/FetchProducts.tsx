import { fetchAllProducts } from "@/app/utilities/data";
import ProductsPage from "@/app/ui/shop/ProductsPage";

export default async function FetchProducts () {
    const products = await fetchAllProducts();
    return (
        <ProductsPage products={products}/>
    )
}