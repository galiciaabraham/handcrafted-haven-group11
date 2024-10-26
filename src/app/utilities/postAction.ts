'use server';

import { sql } from "@vercel/postgres";
import { z } from 'zod';
import { redirect } from "next/navigation";


const PostFormSchema = z.object({
    user_id: z.string(),
    post_content: z.string({
        invalid_type_error: 'Seems that you might be missing some words...',
    }),
    post_title: z.string({
      invalid_type_error: 'Seems that you might be missing a title...',
    }
     ),
    user_type: z.enum(['Seller', 'Customer'], {
      invalid_type_error: 'No type provided',
    }
     )
  });
  
  const CreatePost = PostFormSchema

  export type State = {
    errors?: {
        user_id? : string[];
        post_title? : string[],
        post_content? : string[],
        user_type? : string[],
    };
    message? : string | null;
  };

  
  export async function addPostAction(state: State | undefined, formData : FormData) : Promise<State | undefined> {
      
        const inputData = CreatePost.safeParse({
            user_id: formData.get('user_id'),
            post_title: formData.get('post_title'),
            post_content: formData.get('post_content'),
            user_type : formData.get('user_type')
          });
    
          if (!inputData.success) {
            return {
              errors: inputData.error.flatten().fieldErrors,
              message: 'Missing Fields. Failed to Add Post.',
            };
          }

        if(inputData.data.user_type !== 'Seller') {
          return {
            errors: {user_type: ['Your account is not of the valid type']},
            message: ' Failed to add post',
          }
        }
    
        const { user_id, post_title, post_content } = inputData.data;
        const post_likes_count = 0;
        const post_create_at = new Date().toISOString().split('T')[0];
        const post_updated_at = new Date().toISOString().split('T')[0];
    
      try {
        await sql `
        INSERT INTO posts (user_id, post_title, post_content, post_create_at, post_updated_at, post_likes_count)
        VALUES (${user_id}, ${post_title}, ${post_content}, ${post_create_at}, ${post_updated_at}, ${post_likes_count} )`;
        console.log('post correctly posted');
    
        } catch (error) {
            console.log(error)
            console.log('Error creating invoice')
        }; 
    
      redirect('/feed');
  }
  