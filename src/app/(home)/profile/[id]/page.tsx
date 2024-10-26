'use client';

import ProfileInfo from "@/app/ui/profile/profile-info";
import ProfileOrders from "@/app/ui/profile/profile-orders";
import ProfileReviews from "@/app/ui/profile/profile-reviews";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();
  console.log(session)

  if (status === "loading") {
    return <div>Loading...</div>; // Mostrar algo mientras carga la sesión
  }

  if (status === "authenticated" && session?.user) {
    return (
      <div>
        <h2>Welcome, {session.user.name}</h2>
        
        <ProfileInfo />
        <ProfileReviews />
        <ProfileOrders />
      </div>
    );
  } else {
    return <div>No user session available. Please log in.</div>;
  }
}
