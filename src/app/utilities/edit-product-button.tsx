'use client';

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function EditProductButton ({product_user_id, product_id}: { product_user_id : number, product_id : number}) {
    let isHidden = true;
    const { data : session } = useSession()
    //const session = {user_id: 2, user_type : 'Seller'};    
    const router = useRouter();
    const session_user_id = Number(session?.user?.id);


    if( session_user_id  === product_user_id) {
        isHidden = false;
    }


    return (
        <button onClick={()=> {
                router.push(`/shop/edit-product/?id=${product_id}`);}} id="product-edit-button" type="button" className= {`md:hover:animate-bounce rounded-md text-md  inline-flex  p-1 absolute right-2 top-1 ${isHidden ? "hidden" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
                    <span className="sr-only">Edit your own post</span>
        </button>
    )
}