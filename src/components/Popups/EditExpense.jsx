import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import { updateTransaction } from '../../api/expense';

function EditExpense({ expanse }) {
	const [error, setError] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		updateTransaction(
			expanse._id,
			data.expenseFor,
			data.amount,
			data.description
		)
			.then((response) => {
				if (response.success === 200) {
					console.log(response);
					setError('');
					window.location.reload();
				} else {
					setError(response.message);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<Popup
			trigger={
				<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
					Edit
				</button>
			}
			position='center'
		>
			{(close) => (
				<div className='bg-white rounded-xl p-4 w-96 '>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='flex flex-col gap-4 mb-5'>
							<div className='flex flex-row gap-8  '>
								<label
									htmlFor='expenseFor'
									className='text-gray-400 font-semibold text-lg'
								>
									Expanse For
								</label>
								<input
									type='text'
									defaultValue={expanse.expanseFor}
									className='border-2 text-gray-400 border-gray-400 focus:outline-none rounded-lg p-1 w-1/2'
									{...register('expenseFor', {
										required: true,
									})}
								/>
							</div>
							<div className='flex flex-row gap-8  '>
								<label
									htmlFor='amount'
									className='text-gray-400 font-semibold text-lg'
								>
									Amount
								</label>
								<input
									type='number'
									defaultValue={expanse.amount}
									className='border-2 text-gray-400 border-gray-400 focus:outline-none rounded-lg p-1 w-1/6'
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
									defaultValue={expanse.description}
									className='border-2 text-gray-400 border-gray-400 focus:outline-none rounded-lg p-1 w-1/2'
									{...register('description', { required: true })}
								/>
							</div>

							<div className='flex justify-center gap-4'>
								<button
									type='submit'
									className='bg-slate-400 cursor-pointer flex justify-center items-center text-white rounded-lg p-2 hover:bg-blue-500 '
								>
									Add Expense
								</button>
								<a
									className='close cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
									onClick={close}
								>
									Close
								</a>
							</div>
							{errors.amount?.type === 'required' && (
								<p className='text-red-700 text-xs'>Amount is required</p>
							)}
							{errors.description?.type === 'required' && (
								<p className='text-red-700 text-xs'>Description is required</p>
							)}
							{errors.amount?.type === 'min' && (
								<p className='text-red-700 text-xs'>
									Amount must be at least 10
								</p>
							)}
							{error && (
								<p className='text-red-700 text-xs text-center'>{error}</p>
							)}
						</div>
					</form>
				</div>
			)}
		</Popup>
	);
}

export default EditExpense;
