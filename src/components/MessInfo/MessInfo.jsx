import React, { useState } from 'react';
import { Member } from '../index';
import { capitalizeEachWord } from '../../utils/capitalizeEachWord';
import EditMessImage from '../Popups/EditMessImage';
import EditMessInfo from '../Popups/EditMessInfo';
import ChangeAdmin from '../Popups/ChangeAdmin';

function MessInfo({ mess, isMember, messAdmin, messMembers, isMessAdmin }) {
	return (
		<div className='bg-gray-900 w-full space-y-4 flex flex-col  justify-center items-center rounded-xl p-4 '>
			<div className='relative  img-container  w-[10em] h-[10em]  '>
				<img
					src={mess?.messLogo}
					alt='mess_img'
					className='rounded-full w-40 h-40 object-cover p-1 ring-sky-200 ring-2'
				/>
				{isMessAdmin && <EditMessImage mess={mess} />}
			</div>
			<div className='flex flex-row gap-2 bg-slate-800 p-4 rounded-lg'>
				<div className='flex flex-col gap-2 justify-center items-center py-2'>
					<h1 className='text-4xl font-serif font-light italic'>
						{capitalizeEachWord(mess?.messName)}
					</h1>
					<h2 className='text-xl font-light text-gray-400'>
						{mess?.messDescription}
					</h2>
				</div>
				{isMessAdmin && <EditMessInfo mess={mess} />}
			</div>
			{isMember && (
				<div>
					<h1 className='text-xl font-light'>
						Total Money : {mess?.totalMoney}
					</h1>
				</div>
			)}
			<div className='flex flex-row items-center justify-center gap-2'>
				<div className='flex flex-row items-center'>
					<h1 className='text-2xl font-serif font-light italic'>
						Mess Admin :&nbsp;
					</h1>
					<h1
						className='text-2xl font-serif font-light italic cursor-pointer text-cyan-600 hover:underline'
						onClick={() => navigate(`/user/${messAdmin?._id}`)}
					>
						{capitalizeEachWord(messAdmin?.fullName)}
					</h1>
				</div>
				{isMessAdmin && (
					<ChangeAdmin
						messMembers={messMembers}
						messID={mess._id}
					/>
				)}
			</div>
			<div className='flex flex-col gap-4 m-6'>
				<h1 className='text-2xl font-serif mx-4 font-light italic'>
					Mess Members
				</h1>
				<div className='flex flex-wrap w-full my-2 gap-2 justify-center'>
					{messMembers?.members?.length &&
						messMembers?.members?.map((member) => (
							<div
								key={member._id}
								className='w-full mx-4 cursor-pointer hover:shadow-lg hover:bg-gray-800 rounded-lg'
							>
								<Member
									{...member}
									isMember
									messID={messMembers._id}
								/>
							</div>
						))}
				</div>
			</div>
			<div className='flex flex-row gap-2 items-start justify-start w-full px-6'>
				<h1 className='text-2xl font-serif font-light italic mx-2'>
					Mess Menu
				</h1>
				<div className='flex flex-wrap gap-4 justify-center items-center'>
					{mess?.messMenu?.length &&
						mess?.messMenu.map((menu, index) => (
							<div
								key={index}
								className='flex flex-col gap-2 p-2 justify-center items-center bg-gray-800 rounded-lg'
							>
								{menu}
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

export default MessInfo;
