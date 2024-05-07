import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../api/auth';
import { getMessesById } from '../api/mess';

function UserById() {
	const { id } = useParams();
	const [userDetails, setUserDetails] = useState({});
	const [messes, setMesses] = useState([]);

	useEffect(() => {
		getMessesById(id)
			.then((res) => {
				setMesses(res.data);
			})
			.catch((err) => console.log(err));

		getUserById(id)
			.then((res) => {
				setUserDetails(res.data);
			})
			.catch((err) => console.log(err));
	}, [id]);

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
					</div>

					<h1 className='username text-3xl font-extrabold '>
						{userDetails?.fullName}
					</h1>
					{/* <div className='flex justify-center items-center space-x-3'>
						<h1>{userDetails?.email}</h1>
					</div> */}
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
				</div>
			</div>
		</>
	);
}

export default UserById;
