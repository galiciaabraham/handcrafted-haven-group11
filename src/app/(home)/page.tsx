import HeroBanner from "@/app/ui/home/hero-banner";
import NewProductWrapper from '@/app/ui/home/product-cards'

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 p-8 bg-white gap-8">
      <HeroBanner />
      <div className="bg-accent-1 p-16 rounded-lg col-span-1 md:col-span-2 lg:col-span-1 w-full"><NewProductWrapper /></div>
      <div className="bg-main-1 p-16 rounded-lg col-span-1 md:col-span-1 md:row-span-2 md:row-start-1 md:col-start-3 md:h-full lg:col-span-1 lg:row-span-1 lg:col-start-2 lg:row-start-2 w-full">Highlight template</div>
    </div> 
  );
}
