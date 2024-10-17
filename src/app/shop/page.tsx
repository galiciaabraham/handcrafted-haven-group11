import FetchProducts from "@/app/ui/shop/FetchProducts";
import { Suspense } from "react";

export default function Page() {
    return (
    <>
    <Suspense>
    <FetchProducts />
    </Suspense>
    </>
    )
}