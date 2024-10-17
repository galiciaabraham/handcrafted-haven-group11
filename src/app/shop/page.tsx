import FetchProducts from "../ui/shop/FetchProducts";
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