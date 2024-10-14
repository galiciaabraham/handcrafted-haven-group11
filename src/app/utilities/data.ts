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