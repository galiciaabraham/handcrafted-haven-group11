import { Suspense } from "react";
import { montserrat } from "@/app/ui/fonts";
import FetchUserData from "@/app/ui/profile/FetchDataUser";
import FetchUserPosts from "@/app/ui/profile/FetchUserPosts";
import FetchUserProducts from "@/app/ui/profile/FetchUserProducts";
import FetchUserReviews from "@/app/ui/profile/FetchUserReviews";
import { Metadata } from "next";
import { getUserById } from "@/app/utilities/postAction";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: `Profile`,
}

async function getUserData(){
  const session = await auth()
  if(session?.user?.id != undefined) {
    const user = await getUserById(session?.user?.id)
    return user;
    }
  return {
      user_id: "0",
      user_type: "Customer",
      user_name: "Customer",
  };
}

export default async function Profile() {
  const user = await getUserData()

    return (
      <main>
        <div className="flex-col grid-cols-1 md:grid-cols-3 lg:grid-cols-2 p-8 bg-white gap-8">
          <Suspense>

            {/* Profile Info */}

            <h2 className={`${montserrat.className} mb-4 text-xl md:text-2xl`}>
                My Profile
            </h2>
            <div>
              <FetchUserData />
            </div>
          

            {/* User Posts */}

            <div>
              <div>
                <h2 className={`${montserrat.className} mb-4 text-xl md:text-2xl`}>
                  My Posts
                </h2>
                <FetchUserPosts />
              </div>
            </div>


            {/* User Products */}

            <div >
              { (user.user_type === 'Seller') && 
                 
                  <>
              <h2 className={`${montserrat.className} mb-4 text-xl md:text-2xl`}>
                My Products
              </h2>
              <div className="flex flex-col md:grid md:grid-cols-4 gap-4 m-4 p-4">
                <FetchUserProducts />
              </div>
              </>
              }
              
              {/* User Reviews */}


              <div>
              <h2 className={`${montserrat.className} mb-4 text-xl md:text-2xl`}>
                My Reviews
              </h2>
              <div className="flex flex-col md:grid md:grid-cols-4 gap-4 m-4 p-4">
                <FetchUserReviews />
              </div>
              </div>


            </div>
          </Suspense>
        </div>

      </main>
    );

}
