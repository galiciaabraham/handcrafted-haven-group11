import ProfileInfo from "@/app/ui/profile/profile-info"
import ProfileOrders from "@/app/ui/profile/profile-orders"
import ProfileReviews from "@/app/ui/profile/profile-reviews"

export default function CustomerProfile () {
    return (
        <div>
            <ProfileInfo />
            <ProfileReviews />
            <ProfileOrders />
        </div>
        
    )
}