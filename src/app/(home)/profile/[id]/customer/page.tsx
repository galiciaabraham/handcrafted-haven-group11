import ProfileInfo from "@/app/ui/profile/profile-info"
import ProfileOrders from "@/app/ui/profile/profile-orders"
import ProfileReviews from "@/app/ui/profile/profile-reviews"

import  getServerSession  from "next-auth";
import { authConfig } from "@/auth.config";

export default function CustomerProfile () {
    const session = getServerSession(authConfig);
    console.log(session)
    return (
        <div>
            <ProfileInfo />
            <ProfileReviews />
            <ProfileOrders />
        </div>
        
    )
}