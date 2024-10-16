'use client';

import ProductPreview from "@/app/ui/shop/product-list";
import { fetchAllProducts } from "@/app/utilities/data";
import SearchBar from "../utilities/search-bar";


export default async function Page() {
    const products = await fetchAllProducts();

    
    return (
        <main >
            <SearchBar />
            <div className="flex flex-col md:grid md:grid-cols-4 gap-4 m-4 p-4">
                <ProductPreview products={products} />
            </div>
        </main>
    )
}