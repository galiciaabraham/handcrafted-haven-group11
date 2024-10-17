 import { sql } from "@vercel/postgres";

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
    // const data = await sql`This will eventually be an SQL query to get all the posts`;
    // const posts = data; //Later this data should be formated.
    const posts = [
      {
        post_id: 1,
        user_id: 1,
        post_title: "First Post",
        post_content: "This is the content of the first post.",
        post_create_at: "2024-10-11T12:00:00Z",
        post_updated_at: "2024-10-11T12:00:00Z",
        post_likes_count: 23
      },
      {
        post_id: 1,
        user_id: 2,
        post_title: "Second Post",
        post_content: "This is the content of the second post.",
        post_create_at: "2024-10-12T12:00:00Z",
        post_updated_at: "2024-10-12T12:00:00Z",
        post_likes_count: 50
      },
      ];
      return posts;
} catch (err) {
    console.error('Error fetching data', err);
    throw new Error('Failed to fetch the posts');
}

}