import React from 'react';
import { capitalizeEachWord } from '../utils/capitalizeEachWord';
import extractDateAndTime from '../utils/extractDateAndTime';

function Expanses(props) {
	return (
		<div className='flex flex-col gap-2 p-4 bg-gray-900 rounded-md items-start hover:shadow-lg hover:shadow-slate-600 '>
			<div className='flex flex-col gap-1'>
				<div className='flex flex-row items-center'>
					<h1 className='text-lg font-semibold text-gray-400'>
						Mess Name :&nbsp;
					</h1>
					<h3 className='text-base  font-semibold text-gray-400'>
						{capitalizeEachWord(props.messID.messName)}
					</h3>
				</div>
				<div className='flex flex-col items-start'>
					<h1 className='text-lg font-semibold text-gray-400'>
						Mess Description :&nbsp;
					</h1>
					<p className='text-gray-500'>{props.description}</p>
				</div>
			</div>
			<div className='flex flex-row gap-1'>
				<h1 className='text-lg font-semibold text-gray-400'>
					Amount Spend :&nbsp;
				</h1>
				<h3 className='text-xl font-semibold text-gray-400'>
					₹ {props.amount}
				</h3>
			</div>
			<p className='text-xs text-gray-500'>
				{extractDateAndTime(props.createdAt)}
			</p>
		</div>
	);
}

export default Expanses;
