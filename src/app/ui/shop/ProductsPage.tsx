'use client';

import ProductPreview from "@/app/ui/shop/product-list";
import SearchBar from "@/app/utilities/search-bar";
import { useState, useEffect } from "react";

export default function ProductsPage({ products }: {
    products : Product[];
}) {

  const [isOrder, setOrder] = useState("ABC");
  const [sortedProducts, setSortedProducts] = useState(products);

  const handleOrderChange = () => {
    setOrder(lastOrder => {
      if (lastOrder === "ABC") return "Price";
      if (lastOrder === "Price") return "Rates";
      return "ABC";
      
    });
  };

    useEffect(() => {
        const sortedProducts = [...products].sort((a, b) => {
            if (isOrder === "ABC") return a.title.localeCompare(b.title);
            if (isOrder === "Price") return a.price - b.price;
            //if (isOrder === "Rate") return b.rate - a.rate; This line is to sort the products by rate
            return a.title.localeCompare(b.title);
        });
       setSortedProducts(sortedProducts);
    }, [isOrder, products]
    );

  return (
    <main>
      <SearchBar isOrder={isOrder} onOrderChange={handleOrderChange} />
      <div className="flex flex-col md:grid md:grid-cols-4 gap-4 m-4 p-4">
        <ProductPreview products={sortedProducts} />
      </div>
    </main>
  );
}
