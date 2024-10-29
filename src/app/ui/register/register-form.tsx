'use client';

import { montserrat } from '@/app/ui/fonts';
import { Button } from '../button';
import { useActionState } from 'react';
import { registerUSer } from '@/app/utilities/actions';
import Link from 'next/link';

export default function RegisterForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    registerUSer,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-3">

<Link
                href="/"
                className=" font-text text-main-2 font-medium text-sm px-4 py-2"
            >
                Back
            </Link>

      <div className="flex-1 rounded-lg  px-6 pb-4 pt-8">
        <h1 className={`${montserrat.className} mb-3 text-2xl`}>
          Create a new user
        </h1>
        <div className="w-full">

{/* User Name */}

<div>
            <label
              className="mb-3 mt-5 block text-xs font-medium "
              htmlFor="email"
            >
              Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border  py-[9px] pl-10 text-sm outline-2 placeholder:text-black text-black"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                required
              />
             
            </div>
          </div>

        
{/* Email */}

          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium "
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border  py-[9px] pl-10 text-sm outline-2 placeholder:text-black text-black"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
             
            </div>
          </div>

{/* Password */}

          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium "
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-black text-black"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              
            </div>
          </div>

{/*  */}


{/* Type */}

<fieldset  className="mt-4">
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="seller"
                  name="type"
                  type="radio"
                  value="Seller"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  required
                />
                <label
                  htmlFor="seller"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Seller 
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="customer"
                  name="type"
                  type="radio"
                  value="Customer"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="customer"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Customer
                </label>
              </div>
            </div>
          </div>
        </fieldset>

{/*  */}

        </div>
        <Button className="mt-4 bg-secondary-1 block" aria-disabled={isPending}>
        Sign up  
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
           {/* {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )} */}
        </div>
      </div>
    </form>
  );
}
