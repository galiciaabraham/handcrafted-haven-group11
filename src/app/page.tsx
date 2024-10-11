import HeroBanner from "./ui/hero-banner";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 p-8 bg-white gap-8">
      <HeroBanner />
      <div className="bg-[#48666A] p-16 rounded-lg col-span-1 md:col-span-2 lg:col-span-1 w-full">New products</div>
      <div className="bg-[#BF3919] p-16 rounded-lg col-span-1 md:col-span-1 md:row-span-2 md:row-start-1 md:col-start-3 md:h-full lg:col-span-1 lg:row-span-1 lg:col-start-2 lg:row-start-2 w-full">Highlight template</div>
    </div> 
  );
}
