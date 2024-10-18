import { montserrat } from '@/app/ui/fonts';
import ReviewCard from './review-card';

export default function ProfileReviews() {
    // const profile = await fetchProfile(id);
    return (
        <div className='bg-secondary-2'>
            <h2 className={`${montserrat.className} mb-4 text-xl md:text-2xl`}>
                Last Reviews
            </h2>
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
        </div>
    )
}