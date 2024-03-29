import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button } from './index';
import { userSignup } from '../api/auth';

function RegistrationForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({});
	const [error, setError] = useState('');
	const submit = (data) => {
		try {
			userSignup(data);
		} catch (error) {
			setError(error.message);
		}
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
							{...register('username', {
								required: true,
								validate: {
									matchPattern: (value) => {
										return (
											/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/.test(value) ||
											'Username only contains [a-z, A-Z, 0-9, .]'
										);
									},
								},
							})}
						/>
						{errors.username?.type == 'required' && (
							<p className='text-red-700 text-xs'>Username is required</p>
						)}
						{errors.username?.type == 'matchPattern' && (
							<p className='text-red-700 text-xs'>{errors.username?.message}</p>
						)}
						<Input
							label='Full Name'
							placeholder='Full Name'
							{...register('fullName', {
								required: true,
								validate: {
									matchPattern: (value) => {
										return (
											/^[A-Z][a-z]* [A-Z][a-z]*$/.test(value) ||
											'Give the Correct Full Name'
										);
									},
								},
							})}
						/>
						{errors.fullName?.type == 'required' && (
							<p className='text-red-700 text-xs'>Full Name is required</p>
						)}
						{errors.fullName?.type == 'matchPattern' && (
							<p className='text-red-700 text-xs'>{errors.fullName?.message}</p>
						)}
						<Input
							label='Email'
							placeholder='Email'
							{...register('email', {
								required: true,
								validate: {
									matchPattern: (value) => {
										return (
											/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
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
						<Input
							label='Password'
							type='password'
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
								Password must be at least 6 characters
							</p>
						)}
						<Input
							label='Confirm Password'
							placeholder='Confirm Password'
							type='text'
							{...register('confirmPassword', { required: true, minLength: 6 })}
						/>
						{errors.confirmPassword?.type == 'required' && (
							<p className='text-red-700 text-xs'>
								Confirm Password is required
							</p>
						)}
						{errors.confirmPassword?.type == 'minLength' && (
							<p className='text-red-700 text-xs'>
								Confirm Password must be at least 6 characters
							</p>
						)}
						<Input
							label='Avatar'
							placeholder='Avatar'
							type='file'
							accept='image/png, image/jpeg, image/jpg'
							{...register('avatar', { required: true })}
							className='block  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
						/>
						{errors.avatar && (
							<p className='text-red-700 text-xs'>Avatar is required</p>
						)}
						<Button
							type='submit'
							className='bg-slate-400 text-white rounded-lg p-2 w-full '
						>
							Register
						</Button>
						<p className='text-center'>
							Already have a account?{' '}
							<span className='text-blue-600 cursor-pointer hover:underline'>
								<a href='/login'>Login</a>
							</span>
						</p>
					</div>
				</form>
			</div>
		</>
	);
}

export default RegistrationForm;
