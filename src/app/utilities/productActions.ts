'use server';

import { sql } from "@vercel/postgres";
import { z } from 'zod';
import { redirect } from "next/navigation";
import type { UserProfile } from '@/app/utilities/definitions';



const ProductFormSchema = z.object({
    user_id: z.string().min(1,{message:"ID required try signing in again"}),
    product_title: z.string({
        invalid_type_error: 'Seems that you might be missing a title...',
      }).min(1,{message: 'Seems that you might be missing a title.....'}),
    product_description: z.string({
        invalid_type_error: 'Seems that you might be missing some words...',
    }).min(1,{message: 'Seems that you might be missing some words...'}),
    product_price: z.number({
        invalid_type_error: 'Seems that you might be missing a price...',
    }).min(1,{message: 'Seems that you might be missing a price...'}),
    product_stock_quantity: z.number({
        invalid_type_error: 'Seems that you might be missing a stock count...',
    }).min(1,{message: 'Seems that you might be missing a stock count...'}),
    user_type: z.enum(['Seller', 'Customer'], {
      invalid_type_error: 'No type provided',
    }
     )
  });

  const PostEditFormSchema = z.object({
    user_id: z.number(),
    post_content: z.string({
        invalid_type_error: 'Seems that you might be missing some words...',
    }).min(1,{message: 'Seems that you might be missing some words...'}),
    post_title: z.string({
      invalid_type_error: 'Seems that you might be missing a title...',
    }).min(1,{message: 'Seems that you might be missing a title.....'}),
    user_type: z.enum(['Seller', 'Customer'], {
      invalid_type_error: 'No type provided',
    }),
    post_likes_count: z.number(),
    post_id : z.number(),
  });
  
  const CreateProduct = ProductFormSchema;
  const EditPost = PostEditFormSchema;

  export type State = {
    errors?: {
        user_id? : string[];
        product_title? : string[],
        product_description? : string[],
        user_type? : string[],
        product_stock_quantity? : string[],
        product_id? : string[],
        product_price? : string[],

    };
    message? : string | null;
  };

  export async function getUserById(session_user_id : string) {
    try { 
      const { rows } = await sql<UserProfile>`SELECT * FROM users WHERE user_id=${session_user_id}`;
      const user = rows[0];
      
      return {
        user_id : user.user_id,
        user_type : user.user_type,
        user_name : user.user_name,
      }
    } catch (error) {
      console.error('Error retrieving the user by ID', error);
      throw new Error('Failed to retrieve user information');
  
     }
  }
  
  export async function addProductAction(state: State | undefined, formData : FormData) : Promise<State | undefined> {
        console.log('check 1');
        const inputData = CreateProduct.safeParse({
            user_id: formData.get('user_id'),
            product_title: formData.get('product_title'),
            product_description: formData.get('product_description'),
            user_type : formData.get('user_type'),
            product_price : Number(formData.get('product_price')),
            product_stock_quantity : Number(formData.get('product_stock_quantity')),
          });
          
          if (!inputData.success) {
            return {
              errors: inputData.error.flatten().fieldErrors,
              message: 'Missing Fields. Failed to Add Product.',
            };
          }
          console.log('check 3');
        if(inputData.data.user_type !== 'Seller') {
          return {
            errors: {user_type: ['Your account is not of the valid type']},
            message: ' Failed to add product',
          }
        }
        console.log('check 4');
        const { user_id, product_title, product_description, product_price, product_stock_quantity } = inputData.data;
        const category_id = "1";
        const product_image_url = 'images/products/placeholder.png';
        const product_created_date = new Date().toISOString();
        const product_updated_date = null;
        console.log('check 5');
      try {

        await sql `
        INSERT INTO products (user_id, product_title, product_description, product_price, product_stock_quantity, category_id, product_image_url,  product_created_date, product_updated_date)
        VALUES (${user_id}, ${product_title}, ${product_description}, ${product_price}, ${product_stock_quantity}, ${category_id}, ${product_image_url}, ${product_created_date}, ${product_updated_date} )`;
        console.log('product correctly added');
    
        } catch (error) {
            console.log(error)
            console.log('Error creating product')
        }; 
        console.log('check 6');
      redirect('/shop');
  }

  export async function editProductAction(state: State | undefined, formData : FormData) : Promise<State | undefined> {
    const inputData = EditPost.safeParse({
    user_id : Number(formData.get('user_id')),
    post_title: formData.get('post_title')?.toString(),
    post_content: formData.get('post_content')?.toString(),
    user_type: formData.get('user_type')?.toString(),
    post_likes_count: Number(formData.get('post_likes_count')),
    post_id: Number(formData.get('post_id'))
    });
    
    if (!inputData.success) {
      return {
        errors: inputData.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Edit Post.',
      };
    }

  if(inputData.data.user_type !== 'Seller') {
    return {
      errors: {user_type: ['Your account is not of the valid type']},
      message: ' Failed to edit post',
    }
  }


  const { post_title, post_content, post_likes_count, post_id, user_id } = inputData.data;
  const post_updated_at = new Date().toISOString().split('T')[0];
try {
  await sql `
  UPDATE posts 
  SET post_title = ${post_title},
          post_content = ${post_content},
          post_updated_at = ${post_updated_at},
          post_likes_count = ${post_likes_count}
      WHERE post_id = ${post_id} AND user_id = ${user_id}`;

  console.log('post correctly updated');

  } catch (error) {
      console.log(error)
      console.log('Error editing post')
  }; 

redirect('/feed');

  }

  export async function deleteProduct(post_id : number, user_id : string) {
    const userId = Number(user_id);

    try {
      await sql `DELETE FROM posts WHERE post_id = ${post_id} AND user_id = ${userId}`;
    
      console.log('post deleted correctly');
    
      } catch (error) {
          console.log(error)
          console.log('Error deleting post')
      }; 
    
    redirect('/feed');
  }

  