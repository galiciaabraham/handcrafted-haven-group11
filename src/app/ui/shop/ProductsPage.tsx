'use client';

import ProductPreview from "@/app/ui/shop/product-list";
import SearchBar from "@/app/utilities/search-bar";
import { useState, useEffect, Suspense} from "react";
import { useSearchParams } from "next/navigation";
import AddProductButton from "@/app/ui/shop/AddProductButton";

interface UserData {
    user_id: string;
    user_type: string;
    user_name: string;
  }

export default function ProductsPage({ products, userData}: {
    products : Product[],
    userData : UserData, 
}) {

    const [isOrder, setOrder] = useState("ABC");
    const [sortedProducts, setSortedProducts] = useState(products);
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || "";

    const handleOrderChange = () => {
        setOrder(lastOrder => {
        if (lastOrder === "ABC") return "Price";
        if (lastOrder === "Price") return "Rates";
        return "ABC";
        
        });
    };

        useEffect(() => {
            let filteredProducts = products;

            if (query) {
                filteredProducts = products.filter(
                    product => product.product_title.toLowerCase().includes(query.toLowerCase())
                );
            }

            const sortedProducts = [...filteredProducts].sort((a, b) => {
                if (isOrder === "ABC") return a.product_title.localeCompare(b.product_title);
                if (isOrder === "Price") return a.product_price - b.product_price;
                //if (isOrder === "Rate") return b.rate - a.rate; This line is to sort the products by rate
                return a.product_title.localeCompare(b.product_title);
            });
        setSortedProducts(sortedProducts);
        }, [isOrder, products, query]
        );

    return (
        <main>
        <Suspense>
        <SearchBar isOrder={isOrder} onOrderChange={handleOrderChange} />
        <div className="flex flex-col md:grid md:grid-cols-4 gap-4 m-4 p-4 mb-20 md:mb-20">
            <ProductPreview products={sortedProducts} />
        </div >
        <div className="relative">
        <AddProductButton userType={userData.user_type} />
        </div >
        
        </Suspense>
        </main>
    );
    }
