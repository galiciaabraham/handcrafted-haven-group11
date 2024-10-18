import { oswald, montserrat } from '@/app/ui/fonts';
import Image from 'next/image';


export default function OrderCard() {
    // const order = await fetchOrders(id);
    return (
        <div className='bg-main-2'>
            <h3 className={`${oswald.className} mb-4 text-xl md:text-2xl text-black`}>
                Order {/* order.product */}
            </h3>
            <Image
                src="https://placehold.co/75x75/000000/FFFFFF.png"
                width={75}
                height={75}
                alt={`order picture`}
            />
            <p className='text-black'>Product Name </p> {/* order.productname */}
            <p className='text-black'>$100.00</p> {/*  order.totalvalue */}
            
            
        </div>
    )
}