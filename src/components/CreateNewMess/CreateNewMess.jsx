import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button } from '../index';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function CreateNewMess() {
	const [image, setImage] = useState('');

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const submit = async (data) => {
		reset();
		toast.error('You are not authorized to create a mess');
		setError('You are not authorized to create a mess');
		setTimeout(() => {
			setError('');
			navigate('/');
		}, 3000);
	};

	return (
		<>
			<div className='border-2 border-slate-400 flex flex-col gap-2 p-4  bg-slate-900 rounded-lg'>
				<h1 className='font-sans font-medium text-3xl m-2 text-center '>
					Create a New Mess
				</h1>
				<div className='flex justify-center items-center h-40 w-40 bg-gray-200 dark:bg-gray-800 rounded-lg m-auto'>
					{image ? (
						<img
							src={image}
							alt='upload'
							className='rounded-lg'
						/>
					) : (
						<div>
							<svg
								stroke='currentColor'
								fill='currentColor'
								strokeWidth='0'
								version='1'
								viewBox='0 0 48 48'
								enableBackground='new 0 0 48 48'
								height='10rem'
								width='10rem'
								xmlns='http://www.w3.org/2000/svg'
							>
								<polygon
									fill='#90CAF9'
									points='40,45 8,45 8,3 30,3 40,13'
								></polygon>
								<polygon
									fill='#E1F5FE'
									points='38.5,14 29,14 29,4.5'
								></polygon>
								<polygon
									fill='#1565C0'
									points='21,23 14,33 28,33'
								></polygon>
								<polygon
									fill='#1976D2'
									points='28,26.4 23,33 33,33'
								></polygon>
								<circle
									fill='#1976D2'
									cx='31.5'
									cy='24.5'
									r='1.5'
								></circle>
							</svg>
						</div>
					)}
				</div>

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
								required: 'Mess Name is required',
								pattern: {
									value: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
									message: 'Username only contains [a-z, A-Z, 0-9, .]',
								},
							})}
						/>
						{errors.username && (
							<p className='text-red-700 text-xs'>{errors.username.message}</p>
						)}
						<Input
							label='Description'
							placeholder='Description'
							{...register('description', {
								required: 'Description is required',
							})}
						/>
						{errors.description && (
							<p className='text-red-700 text-xs'>
								{errors.description.message}
							</p>
						)}
						<Input
							label='messLogo'
							placeholder='Mess Logo'
							type='file'
							accept='image/png, image/jpeg, image/jpg'
							{...register('messLogo', {
								required: 'Avatar is required',
								onChange: (e) => {
									const file = e.target.files[0];
									const reader = new FileReader();
									reader.onloadend = () => {
										setImage(reader.result);
									};
									reader.readAsDataURL(file);
								},
							})}
							className='block  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
						/>
						{errors.messLogo && (
							<p className='text-red-700 text-xs'>{errors.messLogo.message}</p>
						)}
						<Button
							type='submit'
							className='bg-slate-400 text-white rounded-lg p-2 w-full '
						>
							Register
						</Button>
						{error && (
							<p className='text-red-700 text-xs text-center mb-2'>{error}</p>
						)}
					</div>
				</form>
			</div>
		</>
	);
}

export default CreateNewMess;
