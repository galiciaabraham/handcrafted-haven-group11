'use client';

import { editPostAction, State } from '@/app/utilities/postAction';
import { useActionState, useState, useEffect } from 'react';
import { deletePost } from '@/app/utilities/postAction'; 

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
    user_id : number,
}

interface EditPostProps {
    userData : UserData;
    postContent : postContent;
}

export default function EditPost({userData, postContent} : EditPostProps) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(editPostAction, initialState);
  const [isClickDelete, setClickDelete] = useState(false);
  const [isBlured, setBlured] = useState(false);
  const [isHidden, setHidden] = useState(true);
  const [isClickCancel, setClickCancel] = useState(false);


  const handleDeleteClick = ()  => {
      setClickDelete(true);
  }

  const handleCancelClick = () => {
    setClickCancel(true);
    setClickDelete(false);
  }


  useEffect(() => {
    if(isClickCancel) {
      setHidden(true)
      setBlured(false)
    }
  }, [isClickCancel])

  useEffect(() => {
    if (isClickDelete) {
        setBlured(true);
        setHidden(false);
    } else {
        setBlured(false);
        setHidden(true);
    }
}, [isClickDelete]);

const handleDeletePost = async(post_id : number, user_id : string) => {
  await deletePost(post_id, user_id);
}


  return (
        <>
        <div className='static'>
        <h2 className='font-extrabold text-xl text-center m-4'>Edit your post: {postContent.post_title} </h2>
        <div className={`bg-accent-1 m-4 rounded-md ${isBlured? "blur-sm" : ""}`}>
          <form action={formAction} className='p-4'>
            <div className='m-4'>
              <label htmlFor="post_title" className="block text-md text-secondary-2 font-bold">
                Give your post a Title:
              </label>
              <input type="text" name="post_title" id="post_title" defaultValue={postContent.post_title} required className="p-2 m-4 bg-main-2 text-black rounded-md shadow-md w-3/4 md:w-1/2" />
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
              <label htmlFor="post_content" className="text-md text-secondary-2 font-bold block">
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
            <input type="hidden" name='user_id' id="user_id" value={userData.user_id}/>
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
          <button onClick={()=> {
             handleDeleteClick()
          }} type='button' className="flex text-main-2 bg-main-1 shadow-lg hover:bg-main-2 hover:text-secondary-2 hover:shadow-lg font-medium rounded-md text-md text-center m-5 p-6 justify-end" >Delete
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
          </button>
          </div>
        </div>
        
          <div id='confirmation-window' className={`rounded-md shadow-md flex flex-wrap justify-between bg-secondary-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isHidden ? "hidden" : ""}`}  >
            <p className='w-full p-4 m-4 text-md text-main-2'>Are you sure you want to delete this post? This action is irreversible! </p>
            <button onClick={() => {
              handleCancelClick()
            }} 
            type='button' className='flex text-secondary-2 bg-main-2 shadow-lg hover:bg-accent-1 hover:shadow-lg font-medium rounded-md text-md text-center m-5 p-5 justify-start'>Cancel</button>
            <button onClick={async () => {
              await handleDeletePost(postContent.post_id, userData.user_id)
            }}
            
            type='button' className='flex text-main-2 bg-main-1 shadow-lg hover:bg-main-2 hover:text-secondary-2 hover:shadow-lg font-medium rounded-md text-md text-center m-5 p-6 justify-end'>Confirm</button>
          </div>
        </div>
        </>
      
    )
}