'use server'; 

 import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { ProductDetails, SellerDetails, ReviewDetails } from "./definitions";



export async function fetchAllProducts () {
    try {
        const { rows } = await sql<Product>`SELECT * FROM products`;
        const products = rows; //Later this data should be formated.
          return products;
    } catch (err) {
        console.error('Error fetching data', err);
        throw new Error('Failed to fetch the products');
    }
}

export async function fetchAllPosts () {
    try {
      const { rows } = await sql<Post>`SELECT * FROM posts`;
      const posts = rows;
      return posts;

  } catch (err) {
      console.error('Error fetching data', err);
      throw new Error('Failed to fetch the posts');
  }
}

export async function checkIfLiked({user_id, post_id} : {
  user_id : number,
  post_id : number,

}) {
  try {
    const liked = await sql`SELECT * FROM post_likes WHERE user_id = ${user_id} AND post_id = ${post_id} AND post_liked = true`;
    if (liked.rows.length > 0) {
      console.log('already liked')
      return true;
    } else {
      console.log('not liked before')
      return false;
    }
  } catch (err) {
    console.error('Error when checking for a like', err);
    throw new Error(`Failed to check likes count on post ID: ${post_id}`)
  }
}

export async function likePost ({user_id, post_id} : {
  user_id : number,
  post_id : number,

}) {
  try {
    await sql`INSERT into post_likes (post_id, user_id, post_liked) VALUES (${post_id}, ${user_id}, true)`;
    //revalidatePath('/feed');
  } catch (err) {
    console.error('Error when submiting a like', err);
    throw new Error(`Failed to update likes count on post ID: ${post_id}`)
  }
}

export async function sumLikes ({post_id}: {post_id : number }) {
  try {
    const liked = await sql`SELECT * FROM post_likes WHERE post_id = ${post_id} AND post_liked = true`;
    console.log('This is the number of likes:', liked.rows.length);
    const likeCount = liked.rows.length;
    await sql`UPDATE posts SET post_likes_count = ${likeCount} WHERE post_id = ${post_id}`
    return likeCount;

  } catch (err) {
    console.error('Error when making the maths of likes', err);
    throw new Error(`Failed to update like count`);
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


