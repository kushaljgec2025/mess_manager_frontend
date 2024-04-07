import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function DashBoard() {
	const userDetails = useSelector((state) => state.auth.userData);
	const messData = useSelector((state) => state.mess.messData).data;
	const navigate = useNavigate();
	// console.log(userDetails);
	console.log(messData);
	const name = userDetails?.fullName?.split(' ')[0];

	const redirect = () => {
		navigate('/create-new-mess');
	};
	function capitalizeEachWord(str) {
		return str.replace(/\b\w/g, function (char) {
			return char.toUpperCase();
		});
	}

	return (
		<>
			<div className='min-h-screen flex flex-col gap-2 p-4'>
				<h1 className='text-4xl font-serif font-light italic  '>Hi! {name}</h1>
				<div className='flex flex-col my-4 gap-8'>
					<h2 className='text-2xl font-semibold text-gray-400'>Your Messes</h2>
					{messData?.length ? (
						<div className='flex flex-col gap-8'>
							{messData.map((mess, index) => (
								<div
									key={index}
									className='p-4 border-gray-200 border-2 rounded-md cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out'
									onClick={() => navigate(`/mess/${mess._id}`)}
								>
									<h3 className='text-xl font-semibold text-gray-600'>
										{capitalizeEachWord(mess.messName)}
									</h3>
								</div>
							))}
						</div>
					) : (
						<h2>
							No mess found Please ask to add or &nbsp;
							<span
								className='text-blue-500 cursor-pointer'
								onClick={redirect}
							>
								create a new mess
							</span>
						</h2>
					)}
				</div>

				<div className='flex flex-col gap-8 my-4'>
					<h1 className='text-2xl font-semibold text-gray-400'>
						Your Expenses
					</h1>
				</div>
			</div>
		</>
	);
}

export default DashBoard;
