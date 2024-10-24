import { fetchSellerDetailsByProductId } from "@/app/utilities/data";
import Image from "next/image";

export default async function SellerDetails({id}: {id:string}){

    const sellerDetails = await fetchSellerDetailsByProductId(id);
    const {user_name, user_profile_picture, user_bio} = sellerDetails;
    return(
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-0">
            <h1 className="font-titles text-3xl text-white font-bold text-center col-span-1 lg:col-span-2 items-center mb-4">About the Artist</h1>
            <div className="md:col-span-1">
                <div className="w-32 h-32 mx-auto my-3 col-span-1">
                    <Image src={`/${user_profile_picture}`} width={196} height={196} alt={`Profile Picture of Seller`} className="w-full h-full object-cover rounded-full" />
                </div>         
                <span className="text-center block text-2xl">{user_name}</span>
            </div>           
            <div className="flex justify-center items-center mx-auto my-4 md:m-auto h-full md:col-span-1">
                <p className="text-center">{user_bio}</p>
            </div>
        </div>

    );
}