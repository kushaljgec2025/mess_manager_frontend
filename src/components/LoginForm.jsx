import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, PasswordInput, Button } from './index';

function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({});

	const submit = (data) => {
		console.log('User details', data);
	};
	return (
		<>
			<div className='border-2 border-slate-400 flex flex-col gap-2 p-4  bg-slate-900 rounded-lg'>
				<h1 className='font-sans font-medium text-3xl m-2 text-center '>
					Login
				</h1>
				<form
					onSubmit={handleSubmit(submit)}
					className='flex flex-col gap-2'
				>
					<div className='flex flex-col px-10 mb-5'>
						<Input
							label='Email'
							placeholder='Email'
							{...register('email', {
								required: true,
								validate: {
									matchPattern: (value) => {
										return (
											/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
												value
											) || 'Invalid email address'
										);
									},
								},
							})}
						/>
						{errors && errors.email?.type === 'required' ? (
							<p className='text-red-700 text-xs'>Email is required</p>
						) : (
							<p className='text-red-700 text-xs'>{errors.email?.message}</p>
						)}
						<PasswordInput
							label='Password'
							placeholder='Password'
							{...register('password', {
								required: true,
								minLength: 6,
							})}
						/>
						{errors.password?.type == 'required' && (
							<p className='text-red-700 text-xs'>Password is required</p>
						)}
						{errors.password?.type == 'minLength' && (
							<p className='text-red-700 text-xs'>
								Password must be at least 6 characters{' '}
							</p>
						)}
						<Button
							type='submit'
							className='bg-slate-400 text-white rounded-lg p-2 w-full '
						>
							Register
						</Button>
						<p className='text-center'>
							Don't have a account?{' '}
							<span className='text-blue-600 cursor-pointer hover:underline'>
								<a href='/registration'>Register</a>
							</span>{' '}
							here
						</p>
					</div>
				</form>
			</div>
		</>
	);
}

export default LoginForm;
