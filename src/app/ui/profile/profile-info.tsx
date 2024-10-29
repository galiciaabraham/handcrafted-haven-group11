import Image from "next/image";
import { fetchUserInfo } from '@/app/utilities/data';


export default async function ProfileInfo(userId:any) {
    
    const response = await fetchUserInfo(userId.userId)
 
    return (
        <div className='bg-accent-2 relative m-4 p-4 rounded-md shadow-md'>

            <Image
                src={`/${response.user_profile_picture}`}
                width={100}
                height={100}
                alt={`${ response.user_name} profile picture`}
            />
            <div>
                <p className='text-accent-1'>Name: {response.user_name}</p> 
            </div>
            <div>
                <p className='text-accent-1'>Email:  {response.user_email}</p>
            </div>
            <div>
                <p className='text-accent-1'>Address:  {response.user_address}</p>
            </div>
            <div>
                <p className='text-accent-1'>About Me:  {response.user_bio}</p>
            </div>


        </div>
    )
}