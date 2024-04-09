import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Navbar() {
	const navigate = useNavigate();
	const userDetails = useSelector((state) => state.auth.userData);
	console.log(userDetails);

	return (
		<>
			<div>
				<nav className='bg-gray-800'>
					<div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
						<div className='relative flex items-center justify-between h-16'>
							<div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
								<div
									className='flex-shrink-0 flex items-center'
									onClick={() => {
										navigate('/');
									}}
								>
									<img
										className='hidden lg:block h-10 w-auto'
										src='/favicon.png'
										alt=''
									/>
								</div>
							</div>
							<div className='hidden sm:block sm:ml-6'>
								{Object.keys(userDetails).length !== 0 ? (
									(console.log(userDetails),
									(
										<div className='flex space-x-4'>
											<div
												className='flex-shrink-0 flex items-center'
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
											<p className='hover:bg-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-lg text-red-600 font-medium'>
												Log out
											</p>
										</div>
									))
								) : (
									<div
										className='flex space-x-4'
										onClick={() => {
											navigate('/login');
										}}
									>
										<p className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium'>
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
