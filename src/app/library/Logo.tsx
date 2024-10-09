import Link from 'next/link';
import Image from 'next/image';
import { oswald } from '../ui/fonts';

export default function HandCraftLogo () {
    return (
    <>
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse w-full"/>
        <Image 
            src="/handcraftlogo.webp"
            width={512}
            height={512}
            className="h-20 w-20" 
            alt="HandCraft Haven Logo"
        />
        <span 
            className={`${oswald.className} antialiased text-2xl text-main-2`}
        >HandCrafted Haven</span>
    </>
    )
}