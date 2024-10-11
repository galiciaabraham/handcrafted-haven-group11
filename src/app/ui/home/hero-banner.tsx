import Image from "next/image";
import { Oswald } from "next/font/google";

const HeroBanner = () => {
    return (
        <div className="bg-[#A5672F] p-6 rounded-lg col-span-1 md:col-span-2 lg:col-span-2 w-full relative">
            <Image src="/images/hero-banner-sm.jpg" width={640} height={403} alt="Handcrafted lanterns picture used as banner" className="w-full h-auto object-cover rounded-lg" />
            <h1 className="absolute bottom-4 md:bottom-8 lg:bottom-16 left-4 md:left-8 lg:left-16 p-4 text-white text-xl md:text-2xl lg:text-4xl">HandCraft Haven</h1>
        </div>
    );
}


export default HeroBanner;