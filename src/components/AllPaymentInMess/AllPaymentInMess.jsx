import React, { useEffect, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import {
	deleteTransactionById,
	getTransactionsByMessId,
	updateTransaction,
} from '../../api/transaction';
import extractDateAndTime from '../../utils/extractDateAndTime';

function AllPaymentInMess({ messId, isMessAdmin, messMembers }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [incomingMoney, setIncomingMoney] = useState([]);
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
		deleteTransactionById(transactionId)
			.then((data) => {
				// console.log(data);
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getTransactionsByMessId(messId, currentPage)
			.then((data) => {
				const dataLength = data.length;
				if (dataLength % 2 == 0) {
					setLength(data.length);
				} else {
					setLength(data.length + 1);
				}
				setIncomingMoney(paginate(data, 2, currentPage));
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
						All Payments
					</h1>
				</div>
				<div className='flex flex-row gap-2'>
					{incomingMoney.map((transaction) => (
						<div
							key={transaction._id}
							className='bg-gray-800 p-4 rounded-lg w-full flex flex-col gap-2 items-start hover:bg-gray-900'
						>
							{isMessAdmin && (
								<div className='flex flex-row w-full gap-2 justify-end'>
									{isChangeable == transaction._id && isEditable && (
										<button
											onClick={saveEditTransaction}
											className='bg-green-500 hover:bg-green-600 text-white px-4 rounded-md'
										>
											save
										</button>
									)}
									{isEditable == transaction._id ? (
										<div
											onClick={() => setIsEditable(false)}
											className='p-1 bg-red-500 rounded-full hover:bg-red-600 cursor-pointer'
										>
											<svg
												stroke='currentColor'
												fill='currentColor'
												strokeWidth='0'
												version='1.1'
												viewBox='0 0 16 16'
												height='1em'
												width='1em'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path d='M15.854 12.854c-0-0-0-0-0-0l-4.854-4.854 4.854-4.854c0-0 0-0 0-0 0.052-0.052 0.090-0.113 0.114-0.178 0.066-0.178 0.028-0.386-0.114-0.529l-2.293-2.293c-0.143-0.143-0.351-0.181-0.529-0.114-0.065 0.024-0.126 0.062-0.178 0.114 0 0-0 0-0 0l-4.854 4.854-4.854-4.854c-0-0-0-0-0-0-0.052-0.052-0.113-0.090-0.178-0.114-0.178-0.066-0.386-0.029-0.529 0.114l-2.293 2.293c-0.143 0.143-0.181 0.351-0.114 0.529 0.024 0.065 0.062 0.126 0.114 0.178 0 0 0 0 0 0l4.854 4.854-4.854 4.854c-0 0-0 0-0 0-0.052 0.052-0.090 0.113-0.114 0.178-0.066 0.178-0.029 0.386 0.114 0.529l2.293 2.293c0.143 0.143 0.351 0.181 0.529 0.114 0.065-0.024 0.126-0.062 0.178-0.114 0-0 0-0 0-0l4.854-4.854 4.854 4.854c0 0 0 0 0 0 0.052 0.052 0.113 0.090 0.178 0.114 0.178 0.066 0.386 0.029 0.529-0.114l2.293-2.293c0.143-0.143 0.181-0.351 0.114-0.529-0.024-0.065-0.062-0.126-0.114-0.178z'></path>
											</svg>
										</div>
									) : (
										<div
											onClick={() => {
												setPayedBy(transaction.payedBy._id);
												setDescription(transaction.description);
												setAmount(transaction.amount);
												setIsEditable(transaction._id);
											}}
											className='p-1 bg-green-500 rounded-full hover:bg-green-600 cursor-pointer'
										>
											<svg
												stroke='currentColor'
												fill='currentColor'
												strokeWidth='0'
												viewBox='0 0 1024 1024'
												height='1em'
												width='1em'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path d='M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z'></path>
											</svg>
										</div>
									)}
									{isEditable !== transaction._id && (
										<div
											onClick={() => {
												deleteTransaction(transaction._id);
											}}
											className='p-1 bg-red-500 rounded-full hover:bg-red-600 cursor-pointer'
										>
											<svg
												stroke='currentColor'
												fill='currentColor'
												strokeWidth='0'
												viewBox='0 0 24 24'
												height='1em'
												width='1em'
												xmlns='http://www.w3.org/2000/svg'
											>
												<g>
													<path
														fill='none'
														d='M0 0h24v24H0z'
													></path>
													<path d='M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z'></path>
												</g>
											</svg>
										</div>
									)}
								</div>
							)}
							<div className='flex flex-row'>
								<h1 className='text-lg text-white'>Payed By :&nbsp;</h1>
								{isEditable == transaction._id ? (
									<select
										defaultValue={transaction.payedBy._id}
										className='border-2 bg-gray-400 border-gray-400 focus:outline-none rounded-lg '
										onChange={(e) => {
											setPayedBy(e.target.value);
											if (e.target.value !== transaction.payedBy._id) {
												setIsChangeable(transaction._id);
											}
										}}
									>
										{messMembers?.map((user) => (
											<option
												key={user._id}
												value={user._id}
												className='text-white font-semibold text-base py-2 hover:bg-gray-800 rounded-lg cursor-pointer'
											>
												{user.fullName}
											</option>
										))}
									</select>
								) : (
									<h1 className='text-lg text-white'>
										{transaction.payedBy.fullName}
									</h1>
								)}
							</div>
							{isEditable == transaction._id ? (
								<div className='flex flex-row items-center'>
									<label
										htmlFor='description'
										className='text-white'
									>
										Description :&nbsp;
									</label>
									<input
										type='text'
										defaultValue={transaction.description}
										onChange={(e) => {
											setDescription(e.target.value);
											if (e.target.value !== transaction.description) {
												if (e.target.value.length > 0) {
													setIsChangeable(transaction._id); //Todo Fix bug in frontend
												} else {
													setIsChangeable('');
												}
											}
										}}
										className='w-2/5 border-2 rounded-md border-slate-400 text-black opacity-80 p-1 ${className} focus:outline-none'
									/>
								</div>
							) : (
								<p className='text-sm  text-white'>{transaction.description}</p>
							)}
							<div className='flex flex-row gap-2'>
								<h1 className='text-lg text-white inline-block'>
									Amount :&nbsp;
								</h1>
								{isEditable == transaction._id ? (
									<input
										type='number'
										defaultValue={transaction.amount}
										onChange={(e) => {
											setAmount(e.target.value);
											if (e.target.value !== transaction.amount) {
												if (e.target.value.length > 10) {
													setIsChangeable(transaction._id); //Todo Fix bug in frontend
												}
											}
										}}
										className='w-2/6 border-2 rounded-md border-slate-400 text-black opacity-80 p-1 ${className} focus:outline-none'
									/>
								) : (
									<p className='text-lg text-white'>{transaction.amount}</p>
								)}
							</div>

							<p className='text-xs  text-gray-400'>
								{extractDateAndTime(transaction.createdAt)}
							</p>
						</div>
					))}
				</div>
				<Pagination
					currentPage={currentPage}
					totalPages={length / 2}
					maxPagesToShow={3}
					onPageChange={handlePageChange}
				/>
			</div>
		</>
	);
}

export default AllPaymentInMess;
