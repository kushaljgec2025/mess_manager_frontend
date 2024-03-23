import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, PasswordInput, Button } from './index';

function RegistrationForm() {
	const { register, handleSubmit } = useForm({});

	const submit = (data) => {
		console.log('User details', data);
	};
	return (
		<>
			<div className='border-2 border-slate-400 flex flex-col gap-2 p-4  bg-slate-900 rounded-lg'>
				<h1 className='font-sans font-medium text-3xl m-2 text-center '>
					Registration
				</h1>
				<form
					onSubmit={handleSubmit(submit)}
					className='flex flex-col gap-2'
				>
					<div className='flex flex-col px-10 mb-5'>
						<Input
							label='Username'
							type='text'
							placeholder='Username'
							{...register('username')}
						/>
						<Input
							label='Full Name'
							placeholder='Full Name'
							{...register('fullName')}
						/>
						<Input
							label='Email'
							placeholder='Email'
							{...register('email')}
						/>
						<PasswordInput
							label='Password'
							placeholder='Password'
							{...register('password')}
						/>
						<Input
							label='Confirm Password'
							placeholder='Confirm Password'
							type='password'
							{...register('confirmPassword')}
						/>
						<Input
							label='Avatar'
							placeholder='Avatar'
							type='file'
							accept='image/png, image/jpeg, image/jpg'
							{...register('avatar')}
							className='block  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
						/>
						<Button
							type='submit'
							className='bg-slate-400 text-white rounded-lg p-2 w-full '
						>
							Register
						</Button>
					</div>
				</form>
			</div>
		</>
	);
}

export default RegistrationForm;
