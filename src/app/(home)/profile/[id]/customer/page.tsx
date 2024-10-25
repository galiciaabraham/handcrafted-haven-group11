"use client"; // Asegúrate de que este archivo sea un componente del cliente

import ProfileInfo from "@/app/ui/profile/profile-info";
import ProfileOrders from "@/app/ui/profile/profile-orders";
import ProfileReviews from "@/app/ui/profile/profile-reviews";
import { useSession } from "next-auth/react";

export default function CustomerProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated" && session?.user) {
    console.log("User ID:", session.user.id);
  } else {
    console.log("No user session available");
  }

  return (
    <div>
      <ProfileInfo />
      <ProfileReviews />
      <ProfileOrders />
    </div>
  );
}
