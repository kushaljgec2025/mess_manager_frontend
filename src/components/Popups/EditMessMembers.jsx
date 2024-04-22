import React from 'react';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { addMess } from '../../store/features/mess/messSlice';

function EditMessMembers({ messMembers }) {
	const { register, handleSubmit } = useForm();
	const [selectMember, setSelectMember] = React.useState(null);
	const dispatch = useDispatch();

	const options = messMembers?.members?.map((member) => ({
		value: member._id,
		label: (
			<div className='flex items-center'>
				<img
					src={member.userAvatar}
					alt={member.fullName}
					className='w-6 h-6 rounded-full mr-2'
				/>
				<span>{member.fullName}</span>
			</div>
		),
	}));

	const onSubmitAdd = (data, close) => {
		console.log('Add member:', data);
		// Dispatch your action here
		toast.success('Member added successfully');
		close();
	};

	const onSubmitDelete = (data, close) => {
		console.log('Delete member:', data);
		// Dispatch your action here
		toast.success('Member deleted successfully');
		close();
	};

	return (
		<Popup
			trigger={
				<button className='flex justify-center items-start h-[1em]'>
					<svg
						stroke='currentColor'
						fill='currentColor'
						strokeWidth='0'
						viewBox='0 0 16 16'
						height='1em'
						width='1em'
						xmlns='http://www.w3.org/2000/svg'
						className='text-gray-400 hover:text-gray-300 cursor-pointer'
					>
						<path d='M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z'></path>
						<path
							fillRule='evenodd'
							d='M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z'
							clipRule='evenodd'
						></path>
					</svg>
				</button>
			}
			position='bottom center'
		>
			{(close) => (
				<div className='bg-white rounded-xl p-4 w-96 '>
					<form onSubmit={handleSubmit((data) => onSubmitAdd(data, close))}>
						<h1 className='text-xl font-serif mx-4 font-light italic text-gray-400 text-center'>
							Add New Member
						</h1>
						<div className='flex flex-col gap-4 mb-5 text-gray-400'>
							<label htmlFor='email'>Members Email Id</label>
							<input
								type='email'
								name='email'
								className='border border-gray-300 rounded-md p-2'
								placeholder='Enter email'
								{...register('email')}
							/>
						</div>
						<div className='flex flex-row gap-4 justify-center items-center'>
							<button
								type='submit'
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
							>
								Add
							</button>
						</div>
					</form>
					<br />
					<form
						onSubmit={handleSubmit(() => onSubmitDelete(selectMember, close))}
					>
						<h1 className='text-xl font-serif mx-4 font-light italic text-gray-400 text-center'>
							Delete Member
						</h1>
						<div className='flex flex-col gap-4 mb-5 text-gray-400'>
							<label htmlFor='email'>Delete Member</label>
							<Select
								{...register('user')}
								options={options}
								className='border border-gray-300 rounded-md p-2'
								onChange={(selectedOption) => setSelectMember(selectedOption)}
							/>
						</div>
						<div className='flex flex-row gap-4 justify-center items-center'>
							<button
								type='submit'
								className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
							>
								Delete
							</button>
						</div>
					</form>
				</div>
			)}
		</Popup>
	);
}

export default EditMessMembers;
