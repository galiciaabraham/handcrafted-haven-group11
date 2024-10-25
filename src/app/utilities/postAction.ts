import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from 'zod';



const PostFormSchema = z.object({
    user_id: z.string(),
    post_content: z.string({
        invalid_type_error: 'Please enter valid content',
    }),
    post_title: z.string({
      invalid_type_error: 'Please enter a valid title',
    }
     ),
  });
  
  const CreatePost = PostFormSchema

  export type State = {
    errors?: {
        user_id? : string[];
        post_title? : string[],
        post_content? : string[],
    };
    message? : string | null;
  };
  
  export async function addPostAction(state: State | undefined, formData : FormData) : Promise<State | undefined> {
    try {
      const inputData = CreatePost.safeParse({
          user_id: formData.get('user_id'),
          post_title: formData.get('post_title'),
          post_content: formData.get('post_content'),
        });
  
        if (!inputData.success) {
          return {
            errors: inputData.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Add Post.',
          };
        }
  
      const { user_id, post_title, post_content } = inputData.data;
      const post_likes_count = 0;
      const post_create_at = new Date().toISOString().split('T')[0];
      const post_updated_at = new Date().toISOString().split('T')[0];
  
  
      await sql `
      INSERT INTO posts (user_id, post_title, post_content, post_create_at, post_updated_at, post_likes_count)
      VALUES (${user_id}, ${post_title}, ${post_content}, ${post_create_at}, ${post_updated_at}, ${post_likes_count} )`;
  
      } catch (error) {
          console.log(error)
          console.log('Error creating invoice')
      };
  
      revalidatePath('/posts');
  }
  