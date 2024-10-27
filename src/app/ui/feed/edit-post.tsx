'use client';

import { editPostAction, State } from '@/app/utilities/postAction';
import { useActionState } from 'react';

interface UserData {
    user_id: string;
    user_type: string;
    user_name: string;
  }

interface postContent {
    post_title: string;
    post_content: string;
    post_likes_count : number;
    post_id : number,
}

interface EditPostProps {
    userData : UserData;
    postContent : postContent;
}

export default function EditPost({userData, postContent} : EditPostProps) {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(editPostAction, initialState);

    console.log('This is the needed data that is being passed down:', postContent.post_id, postContent.post_likes_count, postContent.post_title, userData.user_id, userData.user_type.trim() )
    console.log(`This are their data types: post_id: ${typeof(postContent.post_id)}, post_likes_count: ${typeof(postContent.post_likes_count)}, post_title: ${typeof(postContent.post_title)}, user_id: ${typeof(userData.user_id)}, user_type: ${typeof(userData.user_type)}`)

    return (
        <>
        <h2 className='font-extrabold text-xl text-center m-4'>Edit your post: {postContent.post_title} </h2>
        <div className='bg-accent-1 m-4 rounded-md'>
          <form action={formAction} className='p-4'>
            <div className='m-4'>
              <label htmlFor="post_title" className="text-md text-secondary-2 font-bold">
                Give your post a Title:
              </label>
              <input type="text" name="post_title" id="post_title" defaultValue={postContent.post_title} required className="p-2 m-4 bg-main-2 text-black rounded-md shadow-md w-3/4 md:w-1/3" />
                <div id="post-title-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.post_title &&
                state.errors.post_title.map((error: string) => (
                  <p className="m-4 text-md font-semibold text-secondary-2" key={error}>
                    {error}
                  </p>
                ))}
                </div>
            </div>
            <div className='m-4'>
              <label htmlFor="post_content" className="text-md text-secondary-2 font-bold">
                Write what you want to share:
              </label>
              <textarea name="post_content" id="post_content" defaultValue={postContent.post_content} required className=" p-2 m-4 bg-main-2 text-black rounded-md shadow-md w-3/4 h-40 md:w-1/3" />
                <div id="post-content-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.post_content &&
                state.errors.post_content.map((error: string) => (
                  <p className="m-4 text-md font-semibold text-secondary-2" key={error}>
                    {error}
                  </p>
                ))}
                </div>
            </div>
            <input type="hidden" name='user_type' id="user_type" value={userData.user_type.trim()}/>
            <input type="hidden" name='post_likes_count' id="post_likes_count" value={postContent.post_likes_count}/>
            <input type="hidden" name='post_id' id="post_id" value={postContent.post_id}/>
            <div id="user-type-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.user_type &&
                state.errors.user_type.map((error: string) => (
                  <p className="m-4 text-md font-semibold text-secondary-2" key={error}>
                    {error}
                  </p>
                ))}
                </div>

            <div className='flex justify-center'>
            <input type="submit" value="Update" className=" text-main-2 bg-secondary-2 shadow-lg hover:bg-main-2 hover:text-secondary-2 hover:shadow-lg font-medium rounded-md text-md text-center m-4 p-6" />
            </div>
          </form>
          <div className='flex justify-end' >
          <button type='button' className="flex text-main-2 bg-main-1 shadow-lg hover:bg-main-2 hover:text-secondary-2 hover:shadow-lg font-medium rounded-md text-md text-center m-5 p-6 justify-end'" >Delete</button>
          </div>
        </div>
        </>
      
    )
}