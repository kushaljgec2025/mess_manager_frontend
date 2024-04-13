import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMessesById, getMessMembers } from '../api/mess';
import { useNavigate, useParams } from 'react-router-dom';
import { capitalizeEachWord } from '../utils/capitalizeEachWord';
import { AddMoneyOnMess, Member } from '../components';
import Pagination from '../components/Pagination/Pagination';

function MessByID() {
	const { id } = useParams();
	const [mess, setMess] = useState({});
	const [isMessAdmin, setIsMessAdmin] = useState(false);
	const [messMembers, setMessMembers] = useState([]);
	const [messAdmin, setMessAdmin] = useState('');
	const [isMember, setIsMember] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const navigate = useNavigate();

	const messData = useSelector((state) => state.mess.messData).data;
	const userDetails = useSelector((state) => state.auth.userData);

	useEffect(() => {
		if (messData?.length > 0) {
			const selectedMess = messData?.find((m) => m._id === id);
			if (selectedMess) {
				setMess(selectedMess);
				setIsMember(true);
				// console.log('Got this from the mess data Redux', selectedMess);
				if (selectedMess?.messAdmin?.includes(userDetails?._id)) {
					// console.log('You are the admin of this mess');
					setIsMessAdmin(true);
				} else {
					// console.log('You are not the admin of this mess');
				}
			} else {
				getMessesById(id).then((data) => {
					setMess(data);
					// console.log('Got this from the API', data);
				});
			}
		}
	}, [messData, id]);

	useEffect(() => {
		getMessMembers(id).then((data) => {
			setMessMembers(data);
			// console.log('Mess Members:', data.members);
			data?.members?.forEach((member) => {
				if (member._id === data?.messAdmin) {
					setMessAdmin(member);
				}
			});
		});
	}, [id]);

	return (
		<>
			<div className='min-h-screen w-full p-4 m-2 flex flex-col items-center space-y-4'>
				<div className='bg-gray-900 w-full lg:w-1/2  space-y-4 flex flex-col  justify-center items-center rounded-xl p-4 '>
					<div>
						<img
							src={mess?.messLogo}
							alt='mess_img'
							className='rounded-full w-40 h-40 object-cover p-1 ring-sky-200 ring-2'
						/>
					</div>
					<div className='flex flex-col gap-2 justify-center items-center'>
						<h1 className='text-4xl font-serif font-light italic'>
							{capitalizeEachWord(mess?.messName)}
						</h1>
						<h2 className='text-xl font-light text-gray-400'>
							{mess?.messDescription}
						</h2>
					</div>
					{isMember && (
						<div>
							<h1 className='text-xl font-light'>
								Total Money : {mess?.totalMoney}
							</h1>
						</div>
					)}
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

					{isMember && (
						<Pagination
							currentPage={currentPage}
							totalPages={17}
							maxPagesToShow={7}
							onPageChange={handlePageChange}
						/>
					)}
					{isMessAdmin && (
						<div className='flex flex-col w-full gap-4'>
							<div>
								<AddMoneyOnMess
									messMembers={messMembers.members}
									messId={messMembers._id}
								/>
							</div>
							<button
								className='bg-green-500 hover:bg-green-600 text-white px-4 rounded-md'
								onClick={() => navigate(`/mess/${id}/add-member`)}
							>
								Add Member
							</button>
							<button
								className='bg-green-500 hover:bg-green-600 text-white px-4 rounded-md'
								onClick={() => navigate(`/mess/${id}/add-menu`)}
							>
								Add Menu
							</button>
							<button
								className='bg-green-500 hover:bg-green-600 text-white px-4 rounded-md'
								onClick={() => navigate(`/mess/${id}/add-expense`)}
							>
								Add Expense
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default MessByID;
