'use client';

import { montserrat } from '@/app/ui/fonts';
import { Button } from '../button';
import { useActionState } from 'react';
import { authenticate } from '@/app/utilities/actions';
import Link from 'next/link';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
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
          Please log in to continue.
        </h1>
        <div className="w-full">
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
        </div>
        <div className='flex justify-between'>
          <Button className="mt-4 bg-secondary-1 block" aria-disabled={isPending}>
          Log in  
          </Button>

          <Link
                href="/register"
                className="block font-text text-main-2 font-medium text-sm px-4 py-2"
            >
                New user?
            </Link>
          </div>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
           {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
