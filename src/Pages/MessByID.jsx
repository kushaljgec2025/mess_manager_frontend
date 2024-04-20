import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMessesById, getMessMembers } from '../api/mess';
import { useNavigate, useParams } from 'react-router-dom';
import { AddMoneyOnMess } from '../components';
import AllPaymentInMess from '../components/AllPaymentInMess/AllPaymentInMess';
import AddExpense from '../components/AddExpense/AddExpense';
import AllExpenseInMess from '../components/AllExpenseInMess/AllExpenseInMess';
import MessInfo from '../components/MessInfo/MessInfo';

function MessByID() {
	const { id } = useParams();
	const [mess, setMess] = useState({});
	const [isMessAdmin, setIsMessAdmin] = useState(false);
	const [messMembers, setMessMembers] = useState([]);
	const [messAdmin, setMessAdmin] = useState('');
	const [isMember, setIsMember] = useState(false);

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
		} else {
			getMessesById(id).then((data) => {
				setMess(data);
				// console.log('Got this from the API', data);
			});
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
					<div className='flex flex-col w-full gap-4'>
						<MessInfo
							mess={mess}
							messMembers={messMembers}
							messAdmin={messAdmin}
							isMember={isMember}
							isMessAdmin={isMessAdmin}
						/>
					</div>
					{isMember && (
						<div className='w-full flex flex-col gap-4'>
							<div className='w-full bg-gray-950 py-6 rounded-xl'>
								<AllPaymentInMess
									messId={mess._id}
									isMessAdmin={isMessAdmin}
									messMembers={messMembers.members}
								/>
							</div>
							<div className='w-full bg-gray-950 py-6 rounded-xl'>
								<AllExpenseInMess
									messId={mess._id}
									isMessAdmin={isMessAdmin}
									messMembers={messMembers.members}
								/>
							</div>
						</div>
					)}
					{isMessAdmin && (
						<div className='flex flex-col w-full gap-4'>
							<div>
								<AddMoneyOnMess
									messMembers={messMembers.members}
									messId={messMembers._id}
								/>
							</div>
							<div>
								<AddExpense
									messMembers={messMembers.members}
									messId={messMembers._id}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default MessByID;
