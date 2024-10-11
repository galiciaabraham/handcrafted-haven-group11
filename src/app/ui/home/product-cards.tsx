import { montserrat } from '@/app/ui/fonts';
import Image from 'next/image';


export default async function NewProductWrapper() {
// const { newProduct } = await fetchNewProducts(); <= array?
return (
    <>
        <div className='flex items-center'>
            <div className="mx-auto">
                <Image
                    src="/products/3949b801bbd9.jpg"
                    alt={`product picture`}
                    
                    width={128}
                    height={128}
                />
                <p className="hidden text-sm text-gray-500 sm:block">
                    Product #1
                </p>
            </div>

            <div className="mx-auto">
                <Image
                    src="/products/3949b801bbd9.jpg"
                    alt={`product picture`}
                    width={128}
                    height={128}
                />
                <p className="hidden text-sm text-gray-500 sm:block">
                    Product #2
                </p>
            </div>
        </div>
    </>
);
}
