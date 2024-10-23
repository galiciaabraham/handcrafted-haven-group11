import { sql } from "@vercel/postgres";
import { ProductDetails, SellerDetails, ReviewDetails } from "./definitions";

export async function fetchAllProducts () {
    try {
        // const data = await sql`This will eventually be an SQL query to get all the products`;
        // const products = data; //Later this data should be formated.
        const products = [
            {
              product_id: 1234,
              seller_id: 4321,
              title: "Awesome new product",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
              price: 9999,
              stock_quantity: 100,
              category_id: 7894,
              created_at: new Date().toISOString().split('T')[0],
              updated_at: new Date().toISOString().split('T')[0],
              image_url: "/products/3949b801bbd9.jpg",
              status: "active"
            },
            {
              product_id: 1235,
              seller_id: 4311,
              title: "Not awesome new product",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
              price: 7799,
              stock_quantity: 10,
              category_id: 7842,
              created_at: new Date().toISOString().split('T')[0],
              updated_at: new Date().toISOString().split('T')[0],
              image_url: "/products/3949b801bbd9.jpg",
              status: "active"
            }
          ];
          return products;
    } catch (err) {
        console.error('Error fetching data', err);
        throw new Error('Failed to fetch the products');
    }
}


export async function fetchProductDetails(product_id: string){
  try {
    const { rows } = await sql<ProductDetails>` SELECT 
    user_id,
    product_title,
    product_description,
    product_price,
    product_stock_quantity,
    category_id,
    product_created_date,
    product_updated_date,
    product_image_url
FROM 
    public.products
WHERE 
    product_id = ${product_id};`

    const product = rows[0];
    return product;
  } catch (error) {
    console.error('Error retrieving product information', error);
    throw new Error('Failed to retrieve product information');
  }
  
}

export async function fetchSellerDetailsByProductId(product_id: string){
  try {
    const { rows } = await sql<SellerDetails>`SELECT 
    u.user_id,
    u.user_name,
    u.user_join_date,
    u.user_profile_picture,
    u.user_bio
  FROM 
    public.users u
  JOIN 
    public.products p
  ON 
    u.user_id = p.user_id
  WHERE 
    p.product_id = ${product_id};`

    const seller = rows[0];
    return seller;
  } catch (error) {
    console.error('Error retrieving seller information', error);
    throw new Error('Failed to retrieve seller information');
  }
  
}


export async function fetchReviewsByProductId(product_id: string){
  try {
    const { rows } = await sql<ReviewDetails>`SELECT 
    users.user_name,
    reviews.review_id,
    reviews.review_comment,
    reviews.review_rating,
    reviews.review_created_date
  FROM 
    public.reviews
  JOIN 
    public.users
  ON 
    reviews.user_id = users.user_id
  WHERE 
    reviews.product_id = ${product_id};`

    const reviews = rows;
    return reviews;
  } catch (error) {
    console.error('Error retrieving reviews information', error);
    throw new Error('Failed to retrieve reviews information');
  }
  
}

