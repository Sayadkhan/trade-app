'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';


import { userSchema } from '@/schema/user';
import { useUser } from '@/components/Provider/UserProvider';
import Toaster from '@/components/Toaster';
import { userUpdate } from '@/actions/User';

function Profile() {
  const userInfo = useUser();
  const queryClient = useQueryClient();
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');
  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    post_code: '',
    address: '',
    state: '',
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [formErrors, setFormErrors] = useState({});

  const { mutate: userUpdateMutate, isPending, status } = useMutation({
    mutationFn: userUpdate,
    onSuccess: (data) => {
      setToasterMessage(data.message);
      setToasterOpen(true);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      setToasterOpen(true);
      setToasterMessage(error?.response?.data?.message || 'Something went wrong');
    },
  });

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = (e, field) => {
    setState((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      userSchema.parse(state);
      const formData = new FormData();
      formData.append('first_name', state.first_name);
      formData.append('last_name', state.last_name);
      formData.append('email', state.email);
      formData.append('phone', state.phone);
      formData.append('meta[address][address]', state.address);
      formData.append('meta[address][city]', state.city);
      formData.append('meta[address][post_code]', state.post_code);
      formData.append('meta[address][state]', state.state);
      formData.append('meta[address][country]', state.country);

      if (file) {
        formData.append('image', file);
      }

      userUpdateMutate(formData);
      setFormErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = {};
        error.errors.forEach((err) => {
          const field = err.path[0];
          errors[field] = { message: err.message };
        });
        setFormErrors(errors);
      }
    }
  };

  useEffect(() => {
    if (userInfo) {
      setState({
        first_name: userInfo?.users?.first_name || '',
        last_name: userInfo?.users?.last_name || '',
        email: userInfo?.users?.email || '',
        phone: userInfo?.users?.phone || '',
        country: userInfo?.users?.meta?.address?.country || '',
        city: userInfo?.users?.meta?.address?.city || '',
        post_code: userInfo?.users?.meta?.address?.post_code || '',
        address: userInfo?.users?.meta?.address?.address || '',
        state: userInfo?.users?.meta?.address?.state || '',
      });
    }
  }, [userInfo]);

  return (
    <div className="p-5 bg-white dark:bg-[#1e1e1e] rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">Profile</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Manage your personal information and security options.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-6"
      >
        {/* Profile Picture */}
        <div>
          <p className="text-white mb-2">Profile Picture</p>
          <div className="flex items-center gap-4">
            <Image
              height={90}
              width={90}
              src={
                preview ||
                userInfo?.users?.image ||
                'https://images.unsplash.com/photo-1721390336122-c883e2b5c113?w=500&auto=format&fit=crop&q=60'
              }
              alt="profile"
              className="rounded-full h-[90px] w-[90px] object-cover"
            />
            <button
              type="button"
              onClick={handleButtonClick}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Change Profile
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* Inputs */}
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            ['First Name', 'first_name'],
            ['Last Name', 'last_name'],
            ['Email', 'email', 'email'],
            ['Phone', 'phone'],
            ['Country', 'country'],
            ['City', 'city'],
            ['Post Code', 'post_code'],
            ['Address', 'address'],
            ['State', 'state'],
          ].map(([label, field, type = 'text']) => (
            <div key={field} className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </label>
              <input
                type={type}
                value={state[field]}
                onChange={(e) => handleInputChange(e, field)}
                placeholder={`Enter ${label.toLowerCase()}`}
                className="p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] text-black dark:text-white"
              />
              {formErrors[field]?.message && (
                <span className="text-sm text-red-500 mt-1">
                  {formErrors[field].message}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className={`px-6 py-2 rounded text-white ${
              isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isPending ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>

      <Toaster
        message={toasterMessage}
        type={status === 'error' ? 'error' : 'success'}
        position="top-center"
        isOpen={toasterOpen}
        onClose={() => setToasterOpen(false)}
      />
    </div>
  );
}

export default Profile;
