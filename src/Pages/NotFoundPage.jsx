import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
	return (
		<div className='flex flex-col gap-5 items-center justify-center h-screen bg-gray-100 dark:bg-gray-900'>
			<svg
				stroke='currentColor'
				fill='currentColor'
				strokeWidth='0'
				version='1.1'
				viewBox='0 0 16 16'
				height='10em'
				width='10em'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zM8 1.5c3.59 0 6.5 2.91 6.5 6.5s-2.91 6.5-6.5 6.5-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5zM4 5c0-0.552 0.448-1 1-1s1 0.448 1 1c0 0.552-0.448 1-1 1s-1-0.448-1-1zM10 5c0-0.552 0.448-1 1-1s1 0.448 1 1c0 0.552-0.448 1-1 1s-1-0.448-1-1zM4.998 12.199l-1.286-0.772c0.874-1.454 2.467-2.427 4.288-2.427s3.413 0.973 4.288 2.427l-1.286 0.772c-0.612-1.018-1.727-1.699-3.002-1.699s-2.389 0.681-3.002 1.699z'></path>
			</svg>
			<h1 className='text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4'>
				404 - Page Not Found
			</h1>
			<p className='text-lg text-gray-600 dark:text-gray-300 mb-8'>
				The page you are looking for does not exist.
			</p>

			<Link
				to='/'
				className='mt-8 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg'
			>
				Go to Home
			</Link>
		</div>
	);
}

export default NotFoundPage;
