import { Suspense } from "react";
import EditProduct from "@/app/ui/shop/edit-product";
import { auth } from "@/auth";
import { getUserById } from "@/app/utilities/productActions";
import { fetchProductsById } from "@/app/utilities/data";


async function getUserData(){
  const session = await auth()
  if(session?.user?.id != undefined) {
    const user = await getUserById(session?.user?.id)
    return user;
    }
  return undefined;
}

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({searchParams}: PageProps) {
  const { id } = searchParams
  const userData = await getUserData()
  const product_id = Number(id);
  const productContent = await fetchProductsById(product_id);

  return (
    <>
    <Suspense>
      {userData && productContent ? (
          <EditProduct userData={userData} productContent={productContent}/>
        ) : (
          <div className="flex justify-center m-5 p-5 animate-spin">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M482-160q-134 0-228-93t-94-227v-7l-64 64-56-56 160-160 160 160-56 56-64-64v7q0 100 70.5 170T482-240q26 0 51-6t49-18l60 60q-38 22-78 33t-82 11Zm278-161L600-481l56-56 64 64v-7q0-100-70.5-170T478-720q-26 0-51 6t-49 18l-60-60q38-22 78-33t82-11q134 0 228 93t94 227v7l64-64 56 56-160 160Z"/>
            </svg>
            </div>
        )}
    </Suspense>
    </>
  )
}



