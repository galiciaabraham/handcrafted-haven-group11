'use client';

import { montserrat } from '@/app/ui/fonts';
import Image from "next/image";
import { fetchUserInfo } from '@/app/utilities/data';
import { useEffect, useState } from 'react';
import { UserProfile } from '@/app/utilities/definitions';

export default function ProfileInfo(userId:any) {
    const [userData, setData] = useState<UserProfile>();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(()=> {
        async function fetchUser() {
            setLoading(true);
            const response = await fetchUserInfo(userId.userId)
            setData(response)
            setLoading(false);
        }
        fetchUser()
        console.log(userData?.user_profile_picture)
    })
 
    return (
        <div className='bg-accent-2'>
            <h2 className={`${montserrat.className} mb-4 text-xl md:text-2xl`}>
                My Profile
            </h2>
            <Image
                src={`/images/profiles/default.jpg`}
                width={100}
                height={100}
                alt={`${ userData?.user_name} profile picture`}
            />
            <div>
                <p className='text-accent-1'>Name: {userData?.user_name}</p> 
            </div>
            <div>
                <p className='text-accent-1'>Email:  {userData?.user_email}</p> {/* profile.email */}
            </div>
            <div>
                <p className='text-accent-1'>Address:  {userData?.user_address}</p> {/* profile.email */}
            </div>
            <div>
                <p className='text-accent-1'>About Me:  {userData?.user_bio}</p> {/* profile.email */}
            </div>


        </div>
    )
}