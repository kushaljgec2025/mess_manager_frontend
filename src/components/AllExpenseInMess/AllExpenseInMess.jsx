import React, { useEffect, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import {
	deleteTransactionById,
	getTransactionsByMessId,
	updateTransaction,
} from '../../api/transaction';
import extractDateAndTime from '../../utils/extractDateAndTime';
import { getExpensesByMessId } from '../../api/expense';

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

export default AllExpenseInMess;
