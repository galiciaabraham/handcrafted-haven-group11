"use client"; // Marcar este archivo como componente del cliente

import ProfileInfo from "@/app/ui/profile/profile-info";
import ProfileOrders from "@/app/ui/profile/profile-orders";
import ProfileReviews from "@/app/ui/profile/profile-reviews";
import { useSession } from 'next-auth/react';

export default function CustomerProfile() {
  const { data: session } = useSession();

  if (session?.user) {
    console.log('User ID:', session.user.id); // Aquí está disponible el `user_id`
  }

  return (
    <div>
      <ProfileInfo />
      <ProfileReviews />
      <ProfileOrders />
    </div>
  );
}
