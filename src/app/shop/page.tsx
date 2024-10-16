'use client';

import ProductPreview from "@/app/ui/shop/product-list";
import { fetchAllProducts } from "@/app/utilities/data";
import SearchBar from "../utilities/search-bar";
import { useState, useEffect } from "react";

export default function Page() {

  const [products, setProducts] = useState <Product[]>([]);
  const [isOrder, setOrder] = useState("ABC");

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchAllProducts();
      setProducts(fetchedProducts);
    };
    loadProducts();
  }, []);

  const handleOrderChange = () => {
    setOrder(prevOrder => {
      if (prevOrder === "ABC") return "Price";
      if (prevOrder === "Price") return "Rates";
      return "ABC";
    });
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (isOrder === "ABC") return a.title.localeCompare(b.title);
    if (isOrder === "Price") return b.price - a.price;
    return a.price - b.price;
  });

  return (
    <main>
      <SearchBar isOrder={isOrder} onOrderChange={handleOrderChange} />
      <div className="flex flex-col md:grid md:grid-cols-4 gap-4 m-4 p-4">
        <ProductPreview products={sortedProducts} />
      </div>
    </main>
  );
}
