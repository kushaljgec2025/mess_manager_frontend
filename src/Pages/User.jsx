import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RiPencilLine } from 'react-icons/ri';
import { getMess } from '../api/mess';
import extractDateAndTime from '../utils/extractDateAndTime';
import { capitalizeEachWord } from '../utils/capitalizeEachWord';
import { useNavigate } from 'react-router-dom';

function User() {
	const [messes, setMesses] = useState([]);
	const navigate = useNavigate();

	const userDetails = useSelector((state) => state.auth.userData);
	const messData = useSelector((state) => state.mess.messData).data;

	const memberSince = extractDateAndTime(userDetails?.createdAt || '').split(
		' '
	);

	useEffect(() => {
		if (messData?.length > 0) {
			setMesses(messData);
		} else {
			getMess()
				.then((res) => {
					setMesses(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, [messData]);

	return (
		<div className='dashboard min-h-screen w-full flex justify-center items-center p-2'>
			<div className='dashboard-container bg-gray-900 w-full lg:w-1/2 min-h-screen flex flex-col justify-start py-10 items-center rounded-3xl gap-4'>
				<div className='relative img-container w-24 h-24 lg:w-40 lg:h-40'>
					<img
						src={userDetails?.userAvatar || ''}
						alt='user_img'
						className='rounded-full w-full h-full object-cover p-1 ring-sky-200 ring-2'
					/>
					<button className='absolute inset-0 ring-1 ring-sky-100 bg-cyan-600 backdrop-blur-md bg-opacity-20 p-2 w-[2rem] h-[2rem] hover:w-[2.1em] hover:h-[2.1em] rounded-full text-white font-semibold '>
						<RiPencilLine className='text-[1em] m-auto' />
					</button>
				</div>
				<h1 className='username text-2xl font-extrabold text-center'>
					User Name :{' '}
					<span className='text-blue-500 font-normal'>
						@{userDetails?.userName || ''}
					</span>
				</h1>
				<h1 className='username text-2xl font-extrabold text-center'>
					Name : {userDetails?.fullName || ''}
				</h1>
				<div className='flex justify-center items-center space-x-3'>
					<h1>Email : {userDetails?.email || ''}</h1>
				</div>
				<h2>
					User Since: <span>{memberSince[memberSince.length - 1]}</span>
				</h2>
				<div className='flex flex-col justify-center items-center space-x-3 w-full'>
					<div className='flex items-start justify-start w-full px-8'>
						<h1 className='text-start p-4 rounded-md text-2xl font-serif text-gray-600 font-semibold cursor-pointer'>
							Messes
						</h1>
					</div>
					<div className='messes flex flex-wrap justify-center items-center gap-4'>
						{messes.map((mess, index) => (
							<div
								key={index}
								onClick={() => navigate(`/mess/${mess._id}`)}
							>
								<div className='p-2 flex flex-row border-gray-200 border-2 items-center rounded-md cursor-pointer hover:bg-gray-950 transition duration-300 ease-in-out'>
									<img
										className='w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover hover:shadow-lg transition duration-300 ease-in-out mx-4'
										src={mess.messLogo || ''}
									/>
									<div className='flex flex-col'>
										<h3 className='text-lg lg:text-xl font-semibold text-gray-600'>
											{capitalizeEachWord(mess.messName || '')}
										</h3>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default User;
