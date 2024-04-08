import React from 'react';
import { capitalizeEachWord } from '../utils/capitalizeEachWord';

function MessCard(props) {
	return (
		<div className='p-4 flex flex-row border-gray-200 border-2 items-center rounded-md cursor-pointer hover:bg-gray-900 transition duration-300 ease-in-out'>
			<img
				className='w-16 h-16 rounded-full object-cover hover:shadow-lg transition duration-300 ease-in-out mx-4'
				src={props.messLogo}
			/>
			<div className='flex flex-col'>
				<h3 className='text-2xl font-semibold text-gray-600'>
					{capitalizeEachWord(props.messName)}
				</h3>
				<p className='text-gray-400'>{props.messDescription}</p>
			</div>
		</div>
	);
}

export default MessCard;
