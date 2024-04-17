import React, { useEffect, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import {
	deleteTransactionById,
	getTransactionsByMessId,
	updateTransaction,
} from '../../api/transaction';
import extractDateAndTime from '../../utils/extractDateAndTime';
import { deleteExpenseById, getExpensesByMessId } from '../../api/expense';

function AllExpenseInMess({ messId, isMessAdmin, messMembers }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [expanses, setExpanses] = useState([]);
	const [length, setLength] = useState(3);
	const [isEditable, setIsEditable] = useState('');
	const [isChangeable, setIsChangeable] = useState('');
	const [payedBy, setPayedBy] = useState('');
	const [description, setDescription] = useState('');
	const [amount, setAmount] = useState(0);

	// console.log(messMembers);
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	function paginate(array, page_size, page_number) {
		return array
			.slice()
			.reverse()
			.slice((page_number - 1) * page_size, page_number * page_size);
	}

	const saveEditTransaction = () => {
		updateTransaction(isChangeable, payedBy, amount, description)
			.then((data) => {
				// console.log(data);
				setIsChangeable('');
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setIsEditable(false);
			});
	};

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
		getExpensesByMessId(messId, currentPage)
			.then((data) => {
				console.log(data);
				const dataLength = data.length;
				if (dataLength % 2 == 0) {
					setLength(data.length);
				} else {
					setLength(data.length + 1);
				}
				setExpanses(paginate(data, 2, currentPage));
				// console.log(paginate(data, 2, currentPage));
			})
			.catch((err) => {
				console.log(err);
			});
	}, [currentPage]);
	return (
		<>
			<div className='flex flex-col items-center'>
				<div className='w-full flex items-start px-4 py-2 mb-2'>
					<h1 className='text-2xl font-serif font-light italic text-left text-gray-400'>
						All Expenses
					</h1>
				</div>
				<div className='w-full overflow-scroll  p-1 shadow-md rounded my-6 '>
					<table className='table-auto'>
						<thead>
							<tr className='border-2 border-slate-300'>
								<th className='px-4 py-2'>Date</th>
								<th className='px-4 py-2'>Expense For</th>
								<th className='px-4 py-2'>Amount</th>
								<th className='px-4 py-2'>Description</th>

								{isMessAdmin && <th className='px-4 py-2'>Action</th>}
							</tr>
						</thead>
						<tbody>
							{expanses.map((expanse) => (
								<tr key={expanse._id}>
									<td className='border px-4 py-2'>
										{extractDateAndTime(expanse.createdAt)}
									</td>
									<td className='border px-4 py-2'>{expanse.expanseFor}</td>
									<td className='border px-4 py-2'>{expanse.amount}</td>
									<td className='border px-4 py-2'>{expanse.description}</td>

									{isMessAdmin && (
										<td className='border px-4 py-2'>
											{!isEditable.length && (
												<div className='flex justify-center space-x-2'>
													<button
														className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
														onClick={() => {
															setIsEditable(expanse._id);
															setIsChangeable(expanse._id);
															setPayedBy(expanse.payedBy);
															setDescription(expanse.description);
															setAmount(expanse.amount);
														}}
													>
														Edit
													</button>
													<button
														className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
														onClick={() => {
															deleteTransaction(expanse._id);
														}}
													>
														Delete
													</button>
												</div>
											)}
											{isEditable === expanse._id && (
												<div className='flex justify-center space-x-2'>
													<button
														className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
														onClick={() => {
															saveEdit;
														}}
													>
														Save
													</button>
													<button
														className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
														onClick={() => {
															setIsEditable('');
														}}
													>
														Cancel
													</button>
												</div>
											)}
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
