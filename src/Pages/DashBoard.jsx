import React from 'react';
import { useSelector } from 'react-redux';

function DashBoard() {
	const userDetails = useSelector((state) => state.auth.userData);
	const messData = useSelector((state) => state.mess.messData);
	// console.log(userDetails);
	console.log(messData);
	const name = userDetails?.fullName?.split(' ')[0];

	return (
		<div className='min-h-screen flex flex-col gap-2 p-4'>
			<h1>Hi! {name}</h1>
			{messData.length ? (
				<div className='flex flex-col gap-4'>
					{messData.map((mess, index) => (
						<div
							key={index}
							className='p-4 bg-gray-200 rounded-md'
						>
							<h3>{mess.messName}</h3>
							<p>{mess.messAddress}</p>
						</div>
					))}
				</div>
			) : (
				<h2>No mess found Please ask to add or create a new mess</h2>
			)}
		</div>
	);
}

export default DashBoard;
