import { auth } from "@/auth";
import { fetchUserProducts } from "@/app/utilities/data";
import ProductPreview from "../shop/product-list";

export async function getServerSideProps() {
    const session = await auth();
    const userId = session?.user?.id
    const userProducts = await fetchUserProducts(userId);

    return {
        props : {
            userProducts
        },
    }
 
}

export default async function FetchUserProducts () {
     const props = await getServerSideProps()
    return (
        <ProductPreview products={props.props.userProducts}/>
    )
}