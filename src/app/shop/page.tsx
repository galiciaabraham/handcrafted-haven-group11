import FetchProducts from "@/app/ui/shop/FetchProducts";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Shop`,
    description: `Look for products of your favorites artists, find new craft that are just the right ones for you.`
  }

export default function Page() {
    return (
    <>
    <Suspense>
    <FetchProducts />
    </Suspense>
    </>
    )
}