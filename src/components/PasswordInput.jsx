import React, { forwardRef, useId, useState } from 'react';

const PasswordInput = forwardRef(function PasswordInput(
	{ label, type = 'text', className = '', ...props },
	ref
) {
	const [showPassword, setShowPassword] = useState(false);
	const id = useId();
	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

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
				<div className='flex flex-row border-slate-400 rounded-md bg-[#EAEDF1] ${className} opacity-80'>
					<input
						className={`border-2 w-full text-black  p-1  focus:outline-none`}
						type={showPassword ? 'text' : 'password'}
						ref={ref}
						id={id}
						{...props}
					/>
					{showPassword ? (
						<div
							className='flex px-1 justify-center items-center'
							onClick={toggleShowPassword}
						>
							<svg
								stroke='currentColor'
								fill='currentColor'
								stroke-width='0'
								viewBox='0 0 1024 1024'
								height='1.5em'
								width='1.5em'
								xmlns='http://www.w3.org/2000/svg'
								className='cursor-pointer text-black'
							>
								<path d='M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 0 0 0-51.5zm-63.57-320.64L836 122.88a8 8 0 0 0-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 0 0 0 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 0 0 0 11.31L155.17 889a8 8 0 0 0 11.31 0l712.15-712.12a8 8 0 0 0 0-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 0 0-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 0 1 146.2-106.69L401.31 546.2A112 112 0 0 1 396 512z'></path>
								<path d='M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 0 0 227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 0 1-112 112z'></path>
							</svg>
						</div>
					) : (
						<div
							className='flex px-1 justify-center items-center'
							onClick={toggleShowPassword}
						>
							<svg
								stroke='currentColor'
								fill='currentColor'
								strokeWidth='0'
								viewBox='0 0 1024 1024'
								height='1.5em'
								width='1.5em'
								xmlns='http://www.w3.org/2000/svg'
								className='cursor-pointer text-black'
								onClick={toggleShowPassword}
							>
								<path d='M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z'></path>
							</svg>
						</div>
					)}
				</div>
			</div>
		</>
	);
});

export default PasswordInput;
