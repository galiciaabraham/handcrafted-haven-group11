'use client';

import ProfileInfo from "@/app/ui/profile/profile-info";
import ProfileOrders from "@/app/ui/profile/profile-orders";
import ProfileReviews from "@/app/ui/profile/profile-reviews";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>; // Mostrar algo mientras carga la sesión
  }

  if (status === "authenticated" && session?.user) {
    const userId = session.user.id
    
    
    // <h2>Welcome, {session.user.name}</h2>
    return (
      <div>
        <ProfileInfo userId = {userId} />
        <ProfileReviews userId = {userId} />
        <ProfileOrders userId = {userId} />
      </div>
    );
  } else {
    return <div>No user session available. Please log in.</div>;
  }
}
