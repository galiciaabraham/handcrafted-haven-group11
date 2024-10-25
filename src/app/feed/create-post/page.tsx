'use client';

import { addPostAction, State } from '@/app/utilities/postAction';
import { useActionState } from 'react';

export default function CreatePost() {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(addPostAction, initialState);

    return (
        <>
        <form action={formAction}>

        <div id="customer-error" aria-live="polite" aria-atomic="true">
        {state?.errors?.user_id &&
          state.errors.user_id.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
        </form>
        </>
    )
}