'use server';

import { sql } from "@vercel/postgres";
import { z } from 'zod';
import { redirect } from "next/navigation";
import type { UserProfile } from '@/app/utilities/definitions';
import { revalidatePath } from "next/cache";



const ProductFormSchema = z.object({
    user_id: z.string().min(1,{message:"ID required try signing in again"}),
    product_title: z.string({
        invalid_type_error: 'Seems that you might be missing a title...',
      }).min(1,{message: 'Seems that you might be missing a title...'}).max(20,{message: 'Try with a shorter title...'} ),
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

  const ProductEditFormSchema = z.object({

    user_id: z.number(),

    product_id : z.number(),

    product_title: z.string({
        invalid_type_error: 'Seems that you might be missing a title...',
      }).min(1,{message: 'Seems that you might be missing a title.....'}).max(20,{message: 'Try with a shorter title...'}),

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
    }),
     
  });
  
  const CreateProduct = ProductFormSchema;
  const EditProduct = ProductEditFormSchema;

  export type State = {
    errors?: {
        user_id? : string[];
        product_id? : string[],
        product_title? : string[],
        product_description? : string[],
        product_price? : string[],
        product_stock_quantity? : string[],
        user_type? : string[],


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
        const inputData = CreateProduct.safeParse({
            user_id: formData.get('user_id'),
            product_title: formData.get('product_title')?.toString().trim(),
            product_description: formData.get('product_description')?.toString().trim(),
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
        if(inputData.data.user_type !== 'Seller') {
          return {
            errors: {user_type: ['Your account is not of the valid type']},
            message: ' Failed to add product',
          }
        }
        const { user_id, product_title, product_description, product_price, product_stock_quantity } = inputData.data;
        const category_id = 1;
        const product_image_url = 'images/products/placeholder.png';
        const product_created_date = new Date().toISOString();
        const product_updated_date = null;
      try {

        await sql `
        INSERT INTO products (user_id, product_title, product_description, product_price, product_stock_quantity, category_id, product_image_url,  product_created_date, product_updated_date)
        VALUES (${user_id}, ${product_title}, ${product_description}, ${product_price}, ${product_stock_quantity}, ${category_id}, ${product_image_url}, ${product_created_date}, ${product_updated_date} )`;
        console.log('product correctly added');
    
        } catch (error) {
            console.log(error)
            console.log('Error creating product')
        }; 
      redirect('/shop');
  }

  export async function editProductAction(state: State | undefined, formData : FormData) : Promise<State | undefined> {
    const inputData = EditProduct.safeParse({

    user_id : Number(formData.get('user_id')),
    product_id: Number(formData.get('product_id')),
    product_title: formData.get('product_title')?.toString().trim(),
    product_description: formData.get('product_description')?.toString().trim(),
    user_type: formData.get('user_type')?.toString(),
    product_price: Number(formData.get('product_price')),
    product_stock_quantity : Number(formData.get('product_stock_quantity')),
    
    });
    console.log(inputData.error);
    console.log(inputData.data);
    if (!inputData.success) {
      return {
        errors: inputData.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Edit Post.',
      };
    }

  if(inputData.data.user_type !== 'Seller') {
    return {
      errors: {user_type: ['Your account is not of the valid type']},
      message: ' Failed to edit product',
    }
  }


  const { user_id, product_id, product_title, product_description, product_price, product_stock_quantity } = inputData.data;
    const product_updated_date = new Date().toISOString().split('T')[0];

try {
console.log('reaching query');
  await sql `
   UPDATE products 
   SET product_title = ${product_title},
        product_description = ${product_description},
        product_price = ${product_price},
        product_stock_quantity = ${product_stock_quantity},
        product_updated_date = ${product_updated_date}
    WHERE product_id = ${product_id} AND user_id = ${user_id}`;
    console.log('query successful');
    console.log('product correctly updated');

  } catch (error) {
      console.log(error)
      console.log('Error editing product')
  }; 

redirect('/shop');

  }

  export async function deleteProduct(product_id : number, user_id : string) {
    const userId = Number(user_id);

    try {
      await sql `DELETE FROM products WHERE product_id = ${product_id} AND user_id = ${userId}`;
    
      console.log('product deleted correctly');
    
      } catch (error) {
          console.log(error)
          console.log('Error deleting product')
      }; 
    revalidatePath('/shop');
    redirect('/shop');
  }

  