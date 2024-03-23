import React, { forwardRef, useId } from 'react';

const Input = forwardRef(function Input(
	{ label, type = 'text', className = '', ...props },
	ref
) {
	const id = useId();

	return (
		<>
			<div className='flex flex-col w-full px-0 py-1'>
				{label && (
					<label
						className='w-full'
						htmlFor={id}
					>
						{label}
					</label>
				)}
				<input
					className={`border-2 w-full rounded-md border-slate-400 text-black opacity-80 p-1 ${className} focus:outline-none`}
					type={type}
					ref={ref}
					id={id}
					{...props}
				/>
			</div>
		</>
	);
});

export default Input;
