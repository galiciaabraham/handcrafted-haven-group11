import { oswald, montserrat } from '@/app/ui/fonts';

export default function ReviewCard() {
    // const review = await fetchReviews(id);
    return (
        <div className='bg-main-2'>
            <h3 className={`${oswald.className} mb-4 text-xl md:text-2xl text-black`}>
                Product Review {/* review.product */}
            </h3>
            
                <p className='text-black'>Stars </p> {/* review.punctuation */}
                <p className='text-black'>Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit. Eaque perferendis fugit
                    corporis reiciendis, dolor totam animi in velit fugiat
                    saepe tempora voluptates consectetur error deleniti
                    dignissimos cupiditate iusto inventore similique. </p> {/*  review.review */}
            
            
        </div>
    )
}