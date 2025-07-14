'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';





import Toaster from '@/components/Toaster';
import { signInSchema } from '@/schema/form';
import CookieService from '@/services/cookieService';
import { userSignIn } from '@/actions/auth';
import SignInForm from './components/SignInForm';

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');

  const {
    mutate: signInMutate,
    isPending,
    status,
  } = useMutation({
    mutationFn: userSignIn,
    onSuccess: (data) => {
      console.log('SignIn Success:', data);
      setToasterOpen(true);
      setToasterMessage(data.message);
      CookieService.set('access_token', data.data.access_token);
      router.push('/');
    },
    onError: (error) => {
      setToasterOpen(true);
      setToasterMessage(error.response?.data?.message || 'Login failed');
    },
  });

  const handleLogin = (data) => {
    signInMutate(data);
  };



  return (
    <>
      <div className="w-full flex justify-center p-4">
        <SignInForm
          register={register}
          onLogin={handleSubmit(handleLogin)}
          errors={errors}
          isLoadingSignIn={isPending}
        />
      </div>
      <Toaster
        message={toasterMessage}
        type={status}
        position="top-center"
        isOpen={toasterOpen}
        onClose={() => setToasterOpen(false)}
      />
    </>
  );
}

export default SignIn;
