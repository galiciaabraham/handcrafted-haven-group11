// import { sql } from "@vercel/postgres"; Commented out for dev.

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

export async function fetchAllPosts () {
  try {
    // const data = await sql`This will eventually be an SQL query to get all the posts`;
    // const posts = data; //Later this data should be formated.
    const posts = [
      {
        post_id: 1,
        user_id: 100,
        title: "First Post",
        content: "This is the content of the first post.",
        created_at: "2024-10-11T12:00:00Z",
        updated_at: "2024-10-11T12:00:00Z",
        likes_count: 23
      },
      {
        post_id: 2,
        user_id: 101,
        title: "Second Post",
        content: "This is the content of the second post.",
        created_at: "2024-10-12T14:30:00Z",
        updated_at: "2024-10-12T14:30:00Z",
        likes_count: 17
      },
      ];
      return posts;
} catch (err) {
    console.error('Error fetching data', err);
    throw new Error('Failed to fetch the posts');
}

}