import React from 'react';
import { useForm } from 'react-hook-form';

function RegistrationForm() {
	const { register, handleSubmit, errors } = useForm();

	const onSubmit = (data) => {
		console.log(data);
	};
	return (
		<>
			<div className='border-2 border-slate-400 flex flex-col gap-2 p-2 '>
				<h1 className='font-sans font-medium text-2xl '>Registration</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col gap-2'
				>
					{/* register your input into the hook by invoking the "register" function */}
					<label>Example</label>
					<input
						placeholder='example'
						defaultValue='test'
						className='border-2 border-slate-400 p-1 rounded-md bg-slate-800/50 text-white focus:outline-none'
						{...register('example')}
					/>

					{/* include validation with required or other standard HTML validation rules */}
					<input {...register('exampleRequired', { required: true })} />

					<input type='submit' />
				</form>
			</div>
		</>
	);
}

export default RegistrationForm;
