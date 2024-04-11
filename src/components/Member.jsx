import React from 'react';
import { useNavigate } from 'react-router-dom';

function Member(props) {
	const navigate = useNavigate();
	return (
		<>
			<div
				className='flex flex-row justify-start gap-2 items-center bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 '
				onClick={() => navigate(`/user/${props?._id}`)}
			>
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
		</>
	);
}

export default Member;
