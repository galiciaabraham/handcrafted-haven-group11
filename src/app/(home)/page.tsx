import HeroBanner from "@/app/ui/home/hero-banner";
import NewProductWrapper from '@/app/ui/home/product-cards';
import HighlightWrapper from '@/app/ui/home/recent-posts';

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-8 bg-white gap-8">
      <HeroBanner />
      <div className="bg-accent-1 p-16 rounded-lg col-span-1 md:col-span-2 lg:col-span-1 w-full"><NewProductWrapper /></div>
      <div className="bg-main-1 p-4 rounded-lg"><HighlightWrapper /></div>
    </div> 
  );
}
