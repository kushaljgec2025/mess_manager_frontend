import React, { useEffect, useState } from 'react';
import extractDateAndTime from '../../utils/extractDateAndTime';
import { deleteExpenseById, getExpensesByMessId } from '../../api/expense';
import EditExpense from '../Popups/EditExpense';

function AllExpenseInMess({ messId, isMessAdmin, messMembers }) {
	const [expanses, setExpanses] = useState([]);
	const [limit, setLimit] = useState(5);
	const [isChangeable, setIsChangeable] = useState('');
	const [payedBy, setPayedBy] = useState('');
	const [description, setDescription] = useState('');
	const [amount, setAmount] = useState(0);

	// const saveEditTransaction = () => {
	// 	updateTransaction(isChangeable, payedBy, amount, description)
	// 		.then((data) => {
	// 			// console.log(data);
	// 			setIsChangeable('');
	// 			window.location.reload();
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	const deleteTransaction = (transactionId) => {
		deleteExpenseById(transactionId)
			.then((data) => {
				// console.log(data);
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getExpensesByMessId(messId, limit)
			.then((data) => {
				// console.log(data);
				setExpanses(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [limit]);
	return (
		<>
			<div className='flex flex-col w-full'>
				<div className='w-full flex items-start px-4 py-2 mb-2'>
					<h1 className='text-2xl font-serif font-light italic text-left text-gray-400'>
						All Expenses
					</h1>
				</div>
				<div className='w-full flex px-4 py-2 mb-2 justify-start gap-2 items-center'>
					<label className='text-gray-400'>Select Expense to show</label>
					<select
						className='text-gray-400 p-2 border  rounded'
						onChange={(e) => {
							setLimit(e.target.value);
						}}
					>
						<option value='5'>5</option>
						<option value='10'>10</option>
						<option value='15'>15</option>
						<option value='20'>20</option>
						<option value='25'>25</option>
						<option value='30'>30</option>
					</select>
				</div>
				<div className='w-full p-1 shadow-md overflow-auto rounded my-6 flex justify-center'>
					<table className='table-auto'>
						<thead>
							<tr className='border border-slate-300'>
								<th className='border px-4 py-2'>Sl.No</th>
								<th className='border px-4 py-2'>Date</th>
								<th className='border px-4 py-2'>Expense For</th>
								<th className='border px-4 py-2'>Amount</th>
								<th className='border px-4 py-2'>Description</th>

								{isMessAdmin && <th className='border px-4 py-2'>Action</th>}
							</tr>
						</thead>
						<tbody>
							{Array.isArray(expanses) &&
								expanses.map((expanse, index) => (
									<tr key={expanse._id}>
										<td className='border px-4 py-2'>{index + 1}</td>
										<td className='border px-4 py-2'>
											{extractDateAndTime(expanse.createdAt)}
										</td>
										<td className='border px-4 py-2'>{expanse.expanseFor}</td>
										<td className='border px-4 py-2'>{expanse.amount}</td>
										<td className='border px-4 py-2'>{expanse.description}</td>

										{isMessAdmin && (
											<td className='border px-4 py-2'>
												{
													<div className='flex justify-center space-x-2'>
														<div
															className=''
															onClick={() => {
																setIsChangeable(expanse._id);
																setPayedBy(expanse.payedBy);
																setDescription(expanse.description);
																setAmount(expanse.amount);
															}}
														>
															<EditExpense expanse={expanse} />
														</div>
														<button
															className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
															onClick={() => {
																deleteTransaction(expanse._id);
															}}
														>
															Delete
														</button>
													</div>
												}
											</td>
										)}
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default AllExpenseInMess;
