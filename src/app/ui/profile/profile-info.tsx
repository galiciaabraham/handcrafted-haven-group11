'use client';

import { montserrat } from '@/app/ui/fonts';
import Image from "next/image";

export default function ProfileInfo() {
    // const profile = await fetchProfile(id);
    return (
        <div className='bg-accent-2'>
            <h2 className={`${montserrat.className} mb-4 text-xl md:text-2xl`}>
                My Profile
            </h2>
            <Image
                src="https://placehold.co/100x100/000000/FFFFFF.png"

                width={100}
                height={100}
                alt={`profile picture`}
            />
            <div>
                <p className='text-accent-1'>Name: </p> {/* profile.name */}
            </div>
            <div>
            <p className='text-accent-1'>Profile Name: </p> {/* profile.pname */}
            </div>
            <div>
                <p className='text-accent-1'>Website link: </p> {/* profile.link */}
            </div>
            <div>
                <p className='text-accent-1'>Phone Number: </p> {/* profile.pnumber */}
            </div>
            <div>
                <p className='text-accent-1'>Email: </p> {/* profile.email */}
            </div>

        </div>
    )
}