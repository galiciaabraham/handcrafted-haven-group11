'use server'; 

 import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

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

export async function likePost ({post_id, likesCount} : {
  post_id : number,
  likesCount : number ;

}) {
  try {
    await sql`UPDATE posts SET post_likes_count = ${likesCount} WHERE post_id = ${post_id}`
    revalidatePath('/feed');
  } catch (err) {
    console.error('Error when submiting a like', err);
    throw new Error(`Failed to update likes count on post ID: ${post_id}`)
  }
}

