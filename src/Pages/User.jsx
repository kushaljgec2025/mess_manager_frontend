import React, { useEffect, useState } from 'react';
import { RiPencilLine, RiLogoutBoxLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { getMess } from '../api/mess';

function User() {
	const [messes, setMesses] = useState([]);

	const userDetails = useSelector((state) => state.auth.userData);

	useEffect(() => {
		getMess()
			.then((res) => {
				setMesses(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			<div className='dashboard min-h-screen  w-full p-2 m-2 flex flex-col justify-center items-center space-y-4 '>
				<div className='dashboard-container bg-gray-900 w-1/2 max-h-screen  space-y-4 flex flex-col  justify-center items-center rounded-xl p-4 '>
					<div className=' relative img-container  w-[15em] h-[15em] '>
						<img
							src={userDetails?.userAvatar}
							alt='user_img'
							className=' rounded-full w-full h-full object-cover p-1 ring-sky-200 ring-2'
						/>
						<button className='absolute inset-0 ring-1 ring-sky-100 bg-cyan-600 backdrop-blur-md bg-opacity-20 p-2 w-[3em] h-[3em] rounded-full text-white font-semibold '>
							<RiPencilLine className='text-[2em] m-auto' />
						</button>
					</div>

					<h1 className='username text-3xl font-extrabold  '>
						{userDetails?.fullName}
					</h1>
					<div className='flex justify-center items-center space-x-3'>
						<h1>{userDetails?.email}</h1>
						<RiPencilLine className='text cursor-pointer' />
					</div>
					<div className='flex flex-row gap-2'>
						{messes.length > 0
							? messes.map((mess) => (
									<div key={mess._id}>
										<h2 className='bg-cyan-600 p-4  rounded-md text-xl font-semibold cursor-pointer'>
											{mess.messName}
										</h2>
									</div>
							  ))
							: ''}
					</div>
					{/* <h2>
						Member Since : <span>12 May , 2023</span>
					</h2> */}
					<div className=' detail grid grid-cols-3  p-3 m-2 space-x-2'>
						<div className='border-2 border-sky-200 p-2  rounded-md bg-cyan-600 '>
							<h2 className='text-xl font-bold'>Monthly Payment</h2>
							<h1>₹ 1200</h1>
						</div>
						<div className='border-2 border-sky-200 p-2 rounded-md bg-cyan-600 '>
							<h2 className='text-xl font-bold'>Due Payment</h2>
							<h1>₹ 200</h1>
						</div>
						<div className='border-2 border-sky-200 p-2 rounded-md bg-cyan-600 '>
							<h2 className='text-xl font-bold'>Remaining Days</h2>
							<h1>12 Days</h1>
						</div>
					</div>
					{/* <div className=' p-2 rounded-md m-auto flex space-x-2 bg-red-600 cursor-pointer'>
						<span>Leave Messs</span>
						<RiLogoutBoxLine className=' text-center m-auto' />
					</div> */}
				</div>
			</div>
		</>
	);
}

export default User;
