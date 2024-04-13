import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTransactionsByUserIdInMess } from '../api/transaction';
import { calculateTotalSpentThisMonth } from '../utils/expensesCal';

function Member(props) {
	const [totalSpentThisMonth, setTotalSpentThisMonth] = useState(0);
	// console.log('Member:', props.messID, props._id);
	const navigate = useNavigate();

	useEffect(() => {
		getTransactionsByUserIdInMess(props.messID, props._id).then((data) => {
			setTotalSpentThisMonth(calculateTotalSpentThisMonth(data));
		});
	}, [props]);

	return (
		<>
			<div
				className='flex flex-row w-full justify-between gap-2 items-center bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 '
				onClick={() => navigate(`/user/${props?._id}`)}
			>
				<div className='flex flex-row'>
					<div className='flex flex-row items-center space-x-2'>
						<img
							src={props?.userAvatar}
							alt='profile'
							className='w-16 h-16 p-1 rounded-full hover:bg-slate-900 cursor-pointer'
						/>
					</div>
					<div className='flex flex-col justify-center items-start '>
						<h1 className='text-xl font-normal text-red-600'>
							@{props?.userName}
						</h1>
						<h1 className='text-xl font-normal'>{props?.fullName}</h1>
					</div>
				</div>
				<div className='flex flex-col'>
					<h1 className='text-xl font-medium '>Total Spent :</h1>
					<h1 className='text-xl font-normal'>₹{totalSpentThisMonth}</h1>
				</div>
			</div>
		</>
	);
}

export default Member;
