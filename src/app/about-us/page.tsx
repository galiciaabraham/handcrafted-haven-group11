import { oswald } from "../ui/fonts"

export default function Page() {
    return <>
    <h2 className={ `m-4 p-4 text-center ${oswald.className} text-2xl font-bold`}>Our Company...</h2>
    <div className=" m-8 bg-accent-2 rounded-md">
    <h3 className="text-main-2 m-4 mb-0 p-4 pt-6 font-bold">Mission:</h3>
    <p className="text-main-2 m-4 p-4 mt-0 pt-0">
        At Handcrafted Haven, our mission is to create an inclusive, vibrant virtual space where artists and art enthusiasts can gather, share, and celebrate the beauty of handmade artistry. We aim to build a nurturing environment that fosters creativity, collaboration, and community. Our platform empowers artists to showcase their unique talents, exchange products, and receive meaningful feedback through reviews and posts. We are dedicated to ensuring that every artist, regardless of their skill level or background, has the opportunity to connect with others who share their passion for handmade art.
    </p>

<h3 className="text-main-2 m-4 mb-0 p-4 pt-6 font-bold">Vision:</h3>
<p className="text-main-2 m-4 p-4 mt-0 pt-0">
Our vision is to become the premier online destination for handcrafted art, where creativity knows no bounds and connections are forged through a shared love for artistic expression. We envision a dynamic marketplace where artists and art lovers can seamlessly interact, discovering new talent and appreciating the intricate details of handmade creations. Handcrafted Haven aspires to break down barriers, making art accessible to everyone and bridging the gap between creators and collectors. Through our platform, we strive to inspire a global community that values the craftsmanship, authenticity, and personal touch that handmade art brings to the world.
</p>
<p className="text-main-2 m-4 p-4 mt-0 pt-0">
Together, we will cultivate a space that celebrates the diversity and richness of handmade art, where every brushstroke, stitch, and sculpted detail tells a unique story. Our commitment is to nurture this ecosystem with integrity, creativity, and a deep appreciation for the artistry that brings us all together.
</p>
</div>
    </>
}