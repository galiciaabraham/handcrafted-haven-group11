'use server';

import { sql } from "@vercel/postgres";
import { z } from 'zod';
import { redirect } from "next/navigation";
import type { UserProfile } from '@/app/utilities/definitions';



const PostFormSchema = z.object({
    user_id: z.string().min(1,{message:"ID required try signing in again"}),
    post_content: z.string({
        invalid_type_error: 'Seems that you might be missing some words...',
    }).min(1,{message: 'Seems that you might be missing some words...'}),
    post_title: z.string({
      invalid_type_error: 'Seems that you might be missing a title...',
    }).min(1,{message: 'Seems that you might be missing a title.....'}),
    user_type: z.enum(['Seller', 'Customer'], {
      invalid_type_error: 'No type provided',
    }
     )
  });

  const PostEditFormSchema = z.object({
    user_id: z.string().min(1),
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
  
  const CreatePost = PostFormSchema;
  const EditPost = PostEditFormSchema;

  export type State = {
    errors?: {
        user_id? : string[];
        post_title? : string[],
        post_content? : string[],
        user_type? : string[],
        post_likes_count? : string[],
        post_id? : string[],
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
            console.log('Error creating post')
        }; 
    
      redirect('/feed');
  }

  export async function editPostAction(state: State | undefined, formData : FormData) : Promise<State | undefined> {
    console.log('checkpoint 1');
    const inputData = EditPost.safeParse({
    post_title: formData.get('post_title')?.toString(),
    post_content: formData.get('post_content')?.toString(),
    user_type: formData.get('user_type')?.toString(),
    post_likes_count: Number(formData.get('post_likes_count')),
    post_id: Number(formData.get('post_id'))
    });
    
    console.log('checkpoint 2');

    if (!inputData.success) {
      return {
        errors: inputData.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Edit Post.',
      };
    } else {
      console.log('the inputData is failing');
    }
    console.log('checkpoint 3');

  if(inputData.data.user_type !== 'Seller') {
    return {
      errors: {user_type: ['Your account is not of the valid type']},
      message: ' Failed to edit post',
    }
  }

  console.log('checkpoint 4');

  const { post_title, post_content, post_likes_count, post_id } = inputData.data;
  const post_updated_at = new Date().toISOString().split('T')[0];
  console.log('Update data:', {post_title, post_content, post_likes_count, post_id, post_updated_at} )
try {
  console.log('checkpoint 5');
  await sql `
  UPDATE posts 
  SET post_title = ${post_title},
          post_content = ${post_content},
          post_updated_at = ${post_updated_at},
          post_likes_count = ${post_likes_count}
      WHERE post_id = ${post_id}`;

  console.log('post correctly updated');

  } catch (error) {
      console.log(error)
      console.log('Error editing post')
  }; 

console.log('checkpoint 6');

redirect('/feed');

  }
  