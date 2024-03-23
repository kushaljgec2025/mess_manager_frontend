import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button } from './index';

function RegistrationForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({});
	const [error, setError] = useState('');

	const submit = (data) => {
		try {
			console.log('User details', data);
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
								patton: /^([A-Za-z0-9]){4,20}$/,
							})}
						/>
						{errors.username && (
							<p className='text-red-700 text-xs'>Username is required</p>
						)}
						<Input
							label='Full Name'
							placeholder='Full Name'
							{...register('fullName', {
								required: true,
								patton: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
							})}
						/>
						{errors.fullName && (
							<p className='text-red-700 text-xs'>Full Name is required</p>
						)}
						<Input
							label='Email'
							placeholder='Email'
							{...register('email', { required: true })}
						/>
						{errors.email && (
							<p className='text-red-700 text-xs'>Email is required</p>
						)}
						<Input
							label='Password'
							type='password'
							placeholder='Password'
							{...register('password', { required: true })}
						/>
						{errors.password && (
							<p className='text-red-700 text-xs'>Password is required</p>
						)}
						<Input
							label='Confirm Password'
							placeholder='Confirm Password'
							type='text'
							{...register('confirmPassword', { required: true })}
						/>
						{errors.confirmPassword && (
							<p className='text-red-700 text-xs'>
								Confirm Password is required
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
