export interface ProductDetails {
    product_id: string;
    user_id: string;
    product_title: string;
    product_description: string;
    product_price: Number;
    product_stock_quantity: Number;
    category_id: string;
    product_created_date: Date;
    product_updated_date: Date;
    product_image_url: string;
}

export interface SellerDetails {
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    user_type: string;
    user_join_date: Date;
    user_profile_picture: string;
    user_bio: string;
    user_address: string;
}


export interface ReviewDetails {
    user_name: string;
    review_id: string;
    review_comment: string;
    review_rating: string;
    review_created_date: string;
}