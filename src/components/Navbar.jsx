import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Navbar() {
	const navigate = useNavigate();
	const userDetails = useSelector((state) => state.auth.userData);

	return (
		<>
			<div>
				<nav className='bg-gray-800'>
					<div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
						<div className='relative flex items-center justify-between h-16'>
							<div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
								<div
									className='flex-shrink-0 flex items-center cursor-pointer hover:bg-gray-700 px-2 py-2 rounded-full text-lg font-medium'
									onClick={() => {
										navigate('/');
									}}
								>
									<img
										className='hidden md:block h-10 w-auto'
										src='/favicon.png'
										alt=''
									/>
								</div>
							</div>
							<div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start text-gray-500'>
								<h1 className='text-4xl font-serif font-medium '>
									Mess Manager
								</h1>
							</div>
							<div className='hidden sm:block sm:ml-6'>
								{Object.keys(userDetails).length !== 0 ? (
									<div className='flex space-x-4'>
										<div
											className='flex-shrink-0 flex items-center cursor-pointer hover:bg-gray-700 px-3 py-2 rounded-md text-lg font-medium'
											onClick={() => {
												navigate('/user');
											}}
										>
											<img
												className='hidden lg:block h-10 w-auto'
												src={userDetails?.userAvatar}
												alt=''
											/>
										</div>
										<p className='hover:bg-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-lg text-red-600 font-medium cursor-pointer'>
											Log out
										</p>
									</div>
								) : (
									<div
										className='flex space-x-4'
										onClick={() => {
											navigate('/login');
										}}
									>
										<p className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium cursor-pointer'>
											Login
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</nav>
			</div>
		</>
	);
}

export default Navbar;
