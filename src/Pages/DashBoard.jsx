import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTransactions } from '../api/transaction';
import { Expanses, MessCard } from '../components';

function DashBoard() {
	const [name, setName] = React.useState('');
	const [expenses, setExpenses] = React.useState([]);

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
		getTransactions().then((data) => {
			setExpenses(data);
		});
	}, []);

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
					<div className='flex flex-col gap-4'>
						{expenses.map((expense, index) => (
							<div
								key={index}
								className='flex flex-wrap gap-4 p-4'
							>
								<Expanses {...expense} />
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default DashBoard;
