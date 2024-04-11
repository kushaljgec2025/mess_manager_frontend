import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMessesById } from '../api/mess';
import { useParams } from 'react-router-dom';
import { capitalizeEachWord } from '../utils/capitalizeEachWord';

function MessByID() {
	const { id } = useParams();
	const [mess, setMess] = useState({});
	const [isMessAdmin, setIsMessAdmin] = useState(false);

	const messData = useSelector((state) => state.mess.messData).data;
	const userDetails = useSelector((state) => state.auth.userData);

	useEffect(() => {
		if (messData?.length > 0) {
			const selectedMess = messData?.find((m) => m._id === id);
			if (selectedMess) {
				setMess(selectedMess);
				console.log('Got this from the mess data Redux', selectedMess);
				if (selectedMess?.messAdmin?.includes(userDetails?._id)) {
					console.log('You are the admin of this mess');
					setIsMessAdmin(true);
				} else {
					console.log('You are not the admin of this mess');
				}
			} else {
				getMessesById(id).then((data) => {
					setMess(data);
					console.log('Got this from the API', data);
				});
			}
		}
	}, [messData, id]);

	return (
		<>
			<div className='min-h-screen w-full p-2 m-2 flex flex-col items-center space-y-4'>
				<div className='bg-gray-900 w-1/2 max-h-screen  space-y-4 flex flex-col  justify-center items-center rounded-xl p-4 '>
					<div>
						<img
							src={mess?.messLogo}
							alt='mess_img'
							className='rounded-full w-40 h-40 object-cover p-1 ring-sky-200 ring-2'
						/>
					</div>
					<div>
						<h1 className='text-4xl font-serif font-light italic'>
							{capitalizeEachWord(mess?.messName)}
						</h1>
						<h2 className='text-xl font-light text-gray-400'>
							{mess?.messDescription}
						</h2>
					</div>
				</div>
			</div>
		</>
	);
}

export default MessByID;
