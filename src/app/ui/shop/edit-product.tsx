'use client';

import { editProductAction, State } from '@/app/utilities/productActions';
import { useActionState, useState, useEffect } from 'react';
import { deleteProduct } from '@/app/utilities/productActions'; 

interface UserData {
    user_id: string;
    user_type: string;
    user_name: string;
  }

interface productContent {
    user_id: number;
    product_title: string;
    product_description: string;
    product_price: number;
    product_stock_quantity: number;
    category_id: number;
    product_id : number;
}

interface EditProductProps {
    userData : UserData;
    productContent : productContent;
}

export default function EditProduct({userData, productContent} : EditProductProps) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(editProductAction, initialState);
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

const handleDeletePost = async(product_id : number, user_id : string) => {
  await deleteProduct(product_id, user_id);
}


  return (
        <>
        <div className='static'>
        <h2 className='font-extrabold text-xl text-center m-4'>Edit your product: {productContent.product_title} </h2>
        <div className={`bg-accent-1 m-4 rounded-md ${isBlured? "blur-sm" : ""}`}>
          <form action={formAction} className='p-4'>
            <div className='m-4'>
              <label htmlFor="product_title" className="block text-md text-secondary-2 font-bold">
                Give your product a Title:
              </label>
              <input type="text" name="product_title" id="product_title" placeholder="Enter a Title" required className="p-2 m-4 bg-main-2 text-black rounded-md shadow-md w-3/4 md:w-1/2" />
                <div id="product-title-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.product_title &&
                state.errors.product_title.map((error: string) => (
                  <p className="m-4 text-md font-semibold text-secondary-2" key={error}>
                    {error}
                  </p>
                ))}
                </div>
            </div>
            <div className='m-4'>
              <label htmlFor="product_description" className=" block text-md text-secondary-2 font-bold">
                Write a product description:
              </label>
              <textarea name="product_description" id="product_description" placeholder="I really like making stuff!" required className=" p-2 m-4 bg-main-2 text-black rounded-md shadow-md w-3/4 h-40 md:w-1/2" />
                <div id="product-desc-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.product_description &&
                state.errors.product_description.map((error: string) => (
                  <p className="m-4 text-md font-semibold text-secondary-2" key={error}>
                    {error}
                  </p>
                ))}
                </div>
            </div>

            <div className='m-4'>
              <label htmlFor="product_price" className=" block text-md text-secondary-2 font-bold">
                Add the price of your product: $
              </label>
              <input type="number" name="product_price" id="product_price" placeholder="9.99" required className=" p-2 m-4 bg-main-2 text-black rounded-md shadow-md w-3/4 md:w-1/2" />
                <div id="product-price-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.product_price &&
                state.errors.product_price.map((error: string) => (
                  <p className="m-4 text-md font-semibold text-secondary-2" key={error}>
                    {error}
                  </p>
                ))}
                </div>
            </div>

            <div className='m-4'>
              <label htmlFor="product_stock_quantity" className=" block text-md text-secondary-2 font-bold">
                Add the current stock you have:
              </label>
              <input type='number' name="product_stock_quantity" id="product_stock_quantity" placeholder="10" required className=" p-2 m-4 bg-main-2 text-black rounded-md shadow-md w-3/4 md:w-1/2" />
                <div id="stock-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.product_stock_quantity &&
                state.errors.product_stock_quantity.map((error: string) => (
                  <p className="m-4 text-md font-semibold text-secondary-2" key={error}>
                    {error}
                  </p>
                ))}
                </div>
            </div>

            <div id="user-type-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.user_type &&
                state.errors.user_type.map((error: string) => (
                  <p className="m-4 text-md font-semibold text-secondary-2" key={error}>
                    {error}
                  </p>
                ))}
                </div>
            <div>
                <p className='text-secondary-2'>For now the picture will be a placeholder, later enhancements will allow you add your own pictures. Please stay posted to know the release date of these future updates! </p>
            </div>
            <input type="hidden" name='user_id' id="user_id" value={userData.user_id}/>
            <input type="hidden" name='user_type' id="user_type" value={userData.user_type}/>
        

            <div className='flex justify-center'>
            <input type="submit" value="Create" className=" text-main-2 bg-secondary-2 shadow-lg hover:bg-main-2 hover:text-secondary-2 hover:shadow-lg font-medium rounded-md text-md text-center m-4 p-6" />
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
            <p className='w-full p-4 m-4 text-md text-main-2'>Are you sure you want to delete this product? This action is irreversible! </p>
            <button onClick={() => {
              handleCancelClick()
            }} 
            type='button' className='flex text-secondary-2 bg-main-2 shadow-lg hover:bg-accent-1 hover:shadow-lg font-medium rounded-md text-md text-center m-5 p-5 justify-start'>Cancel</button>
            <button onClick={async () => {
              await handleDeletePost(productContent.product_id, userData.user_id)
            }}
            
            type='button' className='flex text-main-2 bg-main-1 shadow-lg hover:bg-main-2 hover:text-secondary-2 hover:shadow-lg font-medium rounded-md text-md text-center m-5 p-6 justify-end'>Confirm</button>
          </div>
        </div>
        </>
      
    )
}