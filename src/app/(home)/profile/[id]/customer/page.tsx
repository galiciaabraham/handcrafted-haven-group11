'use client';

import { useEffect } from "react";
import ProfileInfo from "@/app/ui/profile/profile-info";
import ProfileOrders from "@/app/ui/profile/profile-orders";
import ProfileReviews from "@/app/ui/profile/profile-reviews";
import { useSession } from "next-auth/react";

export default function CustomerProfile() {
  const { data: session, status } = useSession();
    console.log(session?.user)
  useEffect(() => {
    console.log("Session status:", status);
    if (session) {
      console.log("Session data:", session);
    } else {
      console.log("No session data available");
    }
  }, [status, session]);

  if (status === "loading") {
    return <div>Loading...</div>; // Mostrar algo mientras carga la sesión
  }

  if (status === "authenticated" && session?.user) {
    console.log("User ID:", session.user.id);
    return (
      <div>
        <h2>Welcome, User ID: {session.user.id}</h2>
        <ProfileInfo />
        <ProfileReviews />
        <ProfileOrders />
      </div>
    );
  } else {
    return <div>No user session available. Please log in.</div>;
  }
}
