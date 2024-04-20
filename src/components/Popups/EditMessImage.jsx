import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import { RiPencilLine } from 'react-icons/ri';
import { getMess, updateMessLogo } from '../../api/mess';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addMess } from '../../store/features/mess/messSlice';

function EditMessImage({ mess }) {
	const [image, setImage] = useState('');
	const { register, handleSubmit } = useForm();

	const dispatch = useDispatch();

	const onSubmit = (data, close) => {
		close();
		updateMessLogo(mess._id, data.uploadImage[0])
			.then((res) => {
				getMess().then((messData) => {
					dispatch(addMess(messData));
					toast.success('Mess Logo Updated Successfully');
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Popup
			trigger={
				<button className='absolute inset-0 ring-1 ring-sky-100 bg-cyan-600 backdrop-blur-md bg-opacity-20 p-2 w-[2rem] h-[2rem] hover:w-[2.1em] hover:h-[2.1em] rounded-full text-white font-semibold '>
					<RiPencilLine className='text-[1em] m-auto' />
				</button>
			}
			position='bottom center'
		>
			{(close) => (
				<div className='bg-white rounded-xl p-4 w-96 '>
					<form onSubmit={handleSubmit((data) => onSubmit(data, close))}>
						<div className='flex flex-col gap-4 mb-5'>
							<label
								htmlFor='uploadImage'
								className='text-gray-400 font-semibold text-lg'
							>
								Upload Image
							</label>
							{image && (
								<img
									src={image}
									alt='upload'
									className='rounded-lg'
								/>
							)}

							<input
								type='file'
								className='border-2 text-gray-400 border-gray-400 focus:outline-none rounded-lg p-1'
								{...register('uploadImage', {
									onChange: (e) => {
										const file = e.target.files[0];
										const reader = new FileReader();
										reader.onloadend = () => {
											setImage(reader.result);
										};
										reader.readAsDataURL(file);
									},

									required: true,
								})}
							/>
						</div>
						<div className='flex flex-row gap-4 justify-center items-center'>
							<button
								type='submit'
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
							>
								Submit
							</button>
							<a
								className='close cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
								onClick={close}
							>
								Cancel
							</a>
						</div>
					</form>
				</div>
			)}
		</Popup>
	);
}

export default EditMessImage;
