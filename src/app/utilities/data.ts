'use server'; 

import { sql } from "@vercel/postgres";
import {redirect} from "next/navigation";
import { ProductDetails, SellerDetails, Review, UserProfile } from "./definitions";
import { FormReview } from "../ui/shop/products/reviews/create-review-form";
import {z} from "zod";
import FormReviewEdit from "../ui/shop/products/reviews/edit-review-form";
import { hashPassword } from "./actions";


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

export async function fetchProductsById (product_id : number ) {
  try {
    const { rows } = await sql<Product>`SELECT * FROM products WHERE product_id = ${product_id} `;
    const product = rows[0];
      
      return {
        user_id : product.user_id,
        product_title : product.product_title,
        product_description : product.product_description,
        product_price: product.product_price,
        product_stock_quantity : product.product_stock_quantity,
        category_id : product.category_id,
        product_id : product.product_id,
      }

} catch (err) {
    console.error('Error fetching data', err);
    throw new Error(`Failed to fetch the post by ID: ${product_id}`);
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

export async function fetchPostsById (post_id : number ) {
  try {
    const { rows } = await sql<Post>`SELECT * FROM posts WHERE post_id = ${post_id} `;
    const post = rows[0];
      
      return {
        post_title: post.post_title,
        post_content: post.post_content,
        post_likes_count : post.post_likes_count,
        post_id : post.post_id,
        user_id : post.user_id,
      }

} catch (err) {
    console.error('Error fetching data', err);
    throw new Error(`Failed to fetch the post by ID: ${post_id}`);
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
    const { rows } = await sql<Review>`SELECT 
    users.user_name,
    reviews.review_id,
    reviews.review_comment,
    reviews.review_rating,
    reviews.review_created_date,
    reviews.user_id
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


export async function insertNewUser ({name, email, password, type}: any) {

  const hashedPassword = await hashPassword(password)

  const userProfilePicture : string = "images/profiles/default.jpg"
  const userBio : string = "Write about you"
  

  try {
    const response = await sql`INSERT into users (user_name, user_email, user_password, user_type, user_join_date, user_profile_picture, user_bio) VALUES (${name}, ${email}, ${hashedPassword}, ${type}, NOW(), ${userProfilePicture}, ${userBio} )`;

    return response;
  } catch (err) {
    console.error('Error when creating user', err);
    throw new Error(`Failed to create user`)
  }

}

  export async function fetchUserInfo (userId:any) {
    try {
        const response = await sql<UserProfile>`SELECT * FROM users WHERE user_id=${userId}`;
        const userData = response.rows[0];
        return userData;
    } catch (err) {
        console.error('Error fetching data', err);
        throw new Error('Failed to fetch the user data');
    }
  }
export async function fetchReviewByReviewId(review_id: string){
  try {
    const { rows } = await sql<Review>`SELECT 
    reviews.review_id,
    reviews.review_comment,
    reviews.review_rating,
    reviews.review_created_date,
    reviews.user_id,
    reviews.product_id
  FROM 
    public.reviews

  WHERE 
    reviews.review_id = ${review_id};`

    const reviews = rows;
    return reviews;
  } catch (error) {
    console.error('Error retrieving review information', error);
    throw new Error('Failed to retrieve review information');
  }
  
}




const formReviewSchema = z.object({
  productId: z.string(),
  userId: z.string(),
  reviewRating: z.number().min(1).max(5), 
  reviewComment: z.string().min(1).max(200), 
  reviewDate: z.string(),
})

export async function createReview(formData: FormReview){

  // Validation
  const validateForm = formReviewSchema.safeParse(formData);

  if (!validateForm.success) {
    return {
      errors: Object.fromEntries(
        Object.entries(validateForm.error.flatten().fieldErrors).map(([key, value]) => [
          key,
          value[0], // Take the first error message
        ])
      ),
      message: "Failed to Create Review. Error in field."
    };
  }

  const {reviewComment, reviewDate, productId, reviewRating, userId} = formData;
  // Error handling
  try {
    await sql`INSERT INTO reviews (user_id, product_id, review_rating, review_comment, review_created_date)
    VALUES (${userId}, ${productId}, ${reviewRating}, ${reviewComment}, ${reviewDate})`

    
  } catch (error) {
    console.error('Error creating the review', error);
    throw new Error('Failed to create review');
  }
  redirect(`/shop/products/${productId}`);
}

export async function deleteReview(reviewId: string){
  try {
    await sql`
      DELETE FROM reviews
      WHERE review_id = ${reviewId}
    `;
    return { success: true };
  } catch (error) {
    console.error('Error deleting the review:', error);
    return { success: false, message: 'Failed to delete review' };

  }
}


const formReviewEditSchema = z.object({
  reviewId: z.number(),
  reviewRating: z.number().min(1).max(5), 
  reviewComment: z.string().min(1).max(200),
  productId: z.number(), 
})

type FormReviewEdit = z.infer<typeof formReviewEditSchema>;

export async function updateReview(formData: FormReviewEdit){

  // Validation
  const validateForm = formReviewEditSchema.safeParse(formData);

  if (!validateForm.success) {
    return {
      errors: Object.fromEntries(
        Object.entries(validateForm.error.flatten().fieldErrors).map(([key, value]) => [
          key,
          value[0],
        ])
      ),
      message: "Failed to Create Review. Error in field."
    };
  }

  const {reviewComment, reviewRating, reviewId, productId} = formData;
  // Error handling
  try {
    await sql`UPDATE reviews
    SET review_rating=${reviewRating}, review_comment=${reviewComment}
    WHERE review_id=${reviewId};`

    return {
      success: true,
      redirectTo:`/shop/products/${productId}`
    }
    
  } catch (error) {
    console.error('Error creating the review', error);
    throw new Error('Failed to create review');
  }
 
}export async function fetchUserPosts (userId:any) {
  try {
    const { rows } = await sql<Post>`SELECT * FROM posts WHERE user_id = ${userId}`;
    const posts = rows;
    return posts;

} catch (err) {
    console.error('Error fetching data', err);
    throw new Error('Failed to fetch the posts');
}
}


export async function fetchUserProducts (userId : any) {
  try {
      const { rows } = await sql<Product>`SELECT * FROM products WHERE user_id = ${userId}`;
      const products = rows; //Later this data should be formated.
        return products;
  } catch (err) {
      console.error('Error fetching data', err);
      throw new Error('Failed to fetch the products');
  }
}


export async function fetchReviewsByUserId(userId: any){
  try {
    const { rows } = await sql<Review>`SELECT 
    users.user_name,
    reviews.review_id,
    reviews.review_comment,
    reviews.review_rating,
    reviews.review_created_date,
    reviews.user_id
  FROM 
    public.reviews
  JOIN 
    public.users
  ON 
    reviews.user_id = users.user_id
  WHERE 
    users.user_id = ${userId};`

    const reviews = rows;
    return reviews;
  } catch (error) {
    console.error('Error retrieving reviews information', error);
    throw new Error('Failed to retrieve reviews information');
  }
  
}