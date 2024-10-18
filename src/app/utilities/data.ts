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
    const { rows } = await sql<Post>`SELECT * FROM posts`;
    const posts = rows;
    return posts;

} catch (err) {
    console.error('Error fetching data', err);
    throw new Error('Failed to fetch the posts');
}

}