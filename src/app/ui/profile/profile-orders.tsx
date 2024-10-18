import { montserrat } from '@/app/ui/fonts';
import OrderCard from './order-card';

export default function ProfileOrders() {
    // const profile = await fetchProfile(id);
    return (
        <div className='bg-secondary-1'>
            <h2 className={`${montserrat.className} mb-4 text-xl md:text-2xl`}>
                Last Orders
            </h2>
            <OrderCard />
            <OrderCard />
            
        </div>
    )
}