import ProductPreview from "@/app/ui/shop/product-list";
import { fetchAllProducts } from "@/app/utilities/data";


export default async function Page() {
    const products = await fetchAllProducts();
    
    return (
        <main className="flex flex-col md:grid md:grid-cols-4 gap-4 m-4 p-4">
            <ProductPreview products={products} />
        </main>
    )
}