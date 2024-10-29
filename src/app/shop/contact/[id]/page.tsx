import { fetchUserInfo } from "@/app/utilities/data";
import ProfileInfo from "@/app/ui/profile/profile-info";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Contact Seller`,
  }

export default async function Page({params}: {params:{id:string}} ) {

    const id = params.id;

    return (
        <div className="my-10">
            <h1 className="text-center text-3xl" >Contact Seller at:</h1>
            <div className="bg-accent-1 p-4 md:p-6 rounded-lg w-full lg:max-w-[600px] mx-auto my-10">
            <ProfileInfo userId={id}></ProfileInfo>
        </div>
        </div>
        
       
    )
}