'use client';

import { addProductAction, State } from '@/app/utilities/productActions';
import { useActionState } from 'react';

interface UserData {
    user_id: string;
    user_type: string;
  }

interface AddProductsProps {
    userData : UserData;
}

export default function CreatePost({userData} : AddProductsProps) {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(addProductAction, initialState);


    return (
        <>
        <h2 className='font-extrabold text-xl text-center m-4'>Create a new product: </h2>
        <div className='bg-accent-1 m-4 rounded-md'>
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
              <input type="number" step="0.01" name="product_price" id="product_price" placeholder="9.99" required className=" p-2 m-4 bg-main-2 text-black rounded-md shadow-md w-3/4 md:w-1/2" />
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
        </div>
        </>
      
    )
}