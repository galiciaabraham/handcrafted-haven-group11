
import { Metadata } from 'next';
import RegisterForm from '../ui/register/register-form';

export const metadata: Metadata = {
  title: 'Register',
};
export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32 bg-main-1 bg-opacity-40 rounded-lg">
        <RegisterForm />
      </div>
    </main>
  );
}