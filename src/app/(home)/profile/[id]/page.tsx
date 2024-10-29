import { Suspense } from "react";
import { montserrat } from "@/app/ui/fonts";
import FetchUserData from "@/app/ui/profile/FetchDataUser";
import FetchUserPosts from "@/app/ui/profile/FetchUserPosts";
import FetchUserProducts from "@/app/ui/profile/FetchUserProducts";
import FetchUserReviews from "@/app/ui/profile/FetchUserReviews";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Profile`,
}

export default function Profile() {

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

            <div>
              <h2 className={`${montserrat.className} mb-4 text-xl md:text-2xl`}>
                My Products
              </h2>
              <div className="flex flex-col md:grid md:grid-cols-4 gap-4 m-4 p-4">
                <FetchUserProducts />
              </div>

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
