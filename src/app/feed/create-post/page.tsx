'use client';

import { addPostAction, State } from '@/app/utilities/postAction';
//import { useSession } from 'next-auth/react';
import { useActionState } from 'react';

export default function CreatePost() {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(addPostAction, initialState);
    //const [ data: session] = useSession();
    const session = {user_id: 2}

    return (
        <>
        <h2 className='font-extrabold text-xl text-center m-4'>Create a new post: </h2>
        <div className='bg-accent-1 m-4 rounded-md'>
          <form action={formAction} className='p-4'>
            <div className='m-4'>
              <label htmlFor="post_title" className="text-md text-secondary-2 font-bold">
                Give your post a Title:
              </label>
              <input type="text" name="post_title" id="post_title" placeholder="Enter a Title" required className="p-2 m-4 bg-main-2 text-black rounded-md shadow-md w-3/4 md:w-1/3" />
                <div id="customer-error" aria-live="polite" aria-atomic="true">
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
              <textarea name="post_content" id="post_content" placeholder="I really like making stuff!" required className=" p-2 m-4 bg-main-2 text-black rounded-md shadow-md w-3/4 h-40 md:w-1/3" />
                <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.post_content &&
                state.errors.post_content.map((error: string) => (
                  <p className="m-4 text-md font-semibold text-secondary-2" key={error}>
                    {error}
                  </p>
                ))}
                </div>
            </div>
            <input type="hidden" name='user_id' id="user_id" value={session.user_id}/>

            <div className='flex justify-center'>
            <input type="submit" value="Post" className=" text-main-2 bg-secondary-2 shadow-lg hover:bg-main-2 hover:text-secondary-2 hover:shadow-lg font-medium rounded-md text-md text-center m-4 p-6" />
            </div>
          </form>
        </div>
        </>
      
    )
}