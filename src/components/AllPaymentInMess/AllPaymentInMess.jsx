import React, { useEffect, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import { getTransactionsByMessId } from '../../api/transaction';
import extractDateAndTime from '../../utils/extractDateAndTime';

function AllPaymentInMess({ messId }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [incomingMoney, setIncomingMoney] = useState([]);
	const [length, setLength] = useState(3);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	function paginate(array, page_size, page_number) {
		return array
			.slice()
			.reverse()
			.slice((page_number - 1) * page_size, page_number * page_size);
	}

	useEffect(() => {
		getTransactionsByMessId(messId)
			.then((data) => {
				setLength(data.length);
				setIncomingMoney(paginate(data, 2, currentPage));
				console.log(paginate(data, 2, currentPage));
			})
			.catch((err) => {
				console.log(err);
			});
	}, [currentPage]);
	return (
		<>
			<div className='flex flex-col items-center'>
				<div className='flex flex-row gap-2'>
					{incomingMoney.map((transaction) => (
						<div
							key={transaction._id}
							className='bg-gray-800 p-2 rounded-lg w-full flex flex-col justify-between items-start'
						>
							<div className='flex flex-row'>
								<h1 className='text-lg text-white'>Payed By :&nbsp;</h1>
								<h1 className='text-lg text-white'>
									{transaction.payedBy.fullName}
								</h1>
							</div>
							<p className='text-sm  text-white'>{transaction.description}</p>
							<div className='flex flex-row'>
								<h1 className='text-lg text-white'>Amount :&nbsp;</h1>
								<p className='text-lg text-white'>{transaction.amount}</p>
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
