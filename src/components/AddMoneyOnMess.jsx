import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { Button } from './index';
import { addTransaction } from '../api/transaction';
import toast from 'react-hot-toast';

function AddMoneyOnMess(props) {
	const [error, setError] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		addTransaction(
			props.messId,
			data.select,
			data.amount,
			data.description
		).then((response) => {
			if (response.success === 201) {
				console.log(response);
				setError('');
				toast.success('Successfully add money', {
					duration: 3000,
					position: 'bottom-right',
				});
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			} else {
				setError(response.message);
			}
		});
		// console.log(data);
	};
	return (
		<>
			<div className='bg-gray-950 w-full space-y-4 px-8 flex flex-col rounded-xl py-4'>
				<h1 className='text-2xl font-serif font-light italic text-left text-gray-400'>
					Add Money to Mess
				</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='flex flex-col gap-4 mb-5'>
						<div className='flex flex-row gap-8  '>
							<label
								htmlFor='amount'
								className='text-gray-400 font-semibold text-lg'
							>
								Amount
							</label>
							<input
								type='number'
								className='border-2 bg-gray-400 border-gray-400 focus:outline-none rounded-lg p-1 w-1/6'
								{...register('amount', {
									required: true,
									min: 10,
								})}
							/>
						</div>
						<div className='flex flex-row gap-2'>
							<label
								htmlFor='description'
								className='text-gray-400 font-semibold text-lg'
							>
								Description
							</label>
							<textarea
								rows={4}
								cols={50}
								className='border-2 bg-gray-400 border-gray-400 focus:outline-none rounded-lg p-1 w-1/2'
								{...register('description', { required: true })}
							/>
						</div>
						<div className='flex flex-row gap-2'>
							<label
								htmlFor='select'
								className='text-gray-400 font-semibold text-lg'
							>
								Select User
							</label>
							<select
								{...register('select')}
								className='border-2 bg-gray-400 border-gray-400 focus:outline-none rounded-lg p-2 w-2/5'
							>
								{props.messMembers?.map((user) => (
									<option
										key={user._id}
										value={user._id} // Set the value to user._id instead of 'select'
										className='text-white font-semibold text-base py-2 hover:bg-gray-800 rounded-lg cursor-pointer' // Reduced py-4 to py-2
									>
										{user.fullName}
									</option>
								))}
							</select>
						</div>

						<Button
							type='submit'
							className='bg-slate-400 text-white rounded-lg p-2  '
						>
							Add Money
						</Button>
						{errors.amount?.type === 'required' && (
							<p className='text-red-700 text-xs'>Amount is required</p>
						)}
						{errors.description?.type === 'required' && (
							<p className='text-red-700 text-xs'>Description is required</p>
						)}
						{errors.amount?.type === 'min' && (
							<p className='text-red-700 text-xs'>Amount must be at least 10</p>
						)}
						{error && (
							<p className='text-red-700 text-xs text-center'>{error}</p>
						)}
					</div>
				</form>
			</div>
		</>
	);
}

export default AddMoneyOnMess;
