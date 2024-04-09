import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTransactions } from '../api/transaction';
import { Expanses, MessCard } from '../components';

function DashBoard() {
	const [name, setName] = React.useState('');
	const [expenses, setExpenses] = React.useState([]);
	const [limit, setLimit] = React.useState(5);

	const userDetails = useSelector((state) => state.auth.userData);
	const messData = useSelector((state) => state.mess.messData).data;
	const navigate = useNavigate();

	const redirect = () => {
		navigate('/create-new-mess');
	};

	useEffect(() => {
		if (userDetails) {
			setName(userDetails?.fullName?.split(' ')[0]);
		}
	}, [userDetails]);

	useEffect(() => {
		getTransactions(limit).then((data) => {
			setExpenses(data);
		});
	}, [limit]);

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
									onClick={() => navigate(`/mess/${mess._id}`)}
								>
									<MessCard {...mess} />
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
					<div>
						{expenses.length ? (
							<div>
								<div className='flex flex-row gap-4'>
									<h2 className='text-lg font-semibold text-gray-400'>
										Select limit
									</h2>
									<select
										value={limit}
										onChange={(e) => setLimit(e.target.value)}
										className='py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									>
										<option value='5'>5</option>
										<option value='10'>10</option>
										<option value='15'>15</option>
										<option value='20'>20</option>
									</select>
								</div>
								<div className='flex flex-wrap gap-4 justify-center'>
									{expenses?.map((expense, index) => (
										<div
											key={index}
											className='flex flex-wrap gap-4 p-4'
										>
											<Expanses {...expense} />
										</div>
									))}
								</div>
							</div>
						) : (
							<h2>No Expenses Found</h2>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default DashBoard;
