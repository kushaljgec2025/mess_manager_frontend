import React from 'react';

const Pagination = ({
	currentPage,
	totalPages,
	maxPagesToShow,
	onPageChange,
}) => {
	let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
	let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

	if (endPage - startPage + 1 < maxPagesToShow) {
		if (startPage === 1) {
			endPage = Math.min(maxPagesToShow, totalPages);
		} else {
			startPage = Math.max(1, totalPages - maxPagesToShow + 1);
		}
	}

	return (
		<>
			<div className='flex flex-row text-white text-base mt-2 my-2'>
				<button
					onClick={() => onPageChange(Math.max(1, currentPage - 2))}
					disabled={currentPage === 1}
					className='p-2 mx-1 hover:bg-gray-300/20 hover:text-white rounded-lg'
				>
					&lt;&lt;
				</button>
				<button
					onClick={() => onPageChange(Math.max(1, currentPage - 1))}
					disabled={currentPage === 1}
					className='p-2 mx-1 hover:bg-gray-300/20 hover:text-white rounded-lg'
				>
					&lt;
				</button>
				{Array.from({ length: endPage - startPage + 1 }, (_, i) => {
					const page = startPage + i;
					const isCurrentPage = page === currentPage;
					return (
						<button
							key={page}
							onClick={() => onPageChange(page)}
							className={`p-2 mx-1 rounded-md ${
								isCurrentPage
									? ' bg-gray-400'
									: 'hover:bg-gray-300/20 hover:text-white'
							}`}
						>
							{Math.floor(page)}
						</button>
					);
				})}
				{/* {endPage < totalPages && <span className='flex items-center'>...</span>} */}
				<button
					onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
					disabled={currentPage === totalPages}
					className='p-2 mx-1 hover:bg-gray-300/20 hover:text-white rounded-lg'
				>
					&gt;
				</button>
				<button
					onClick={() => onPageChange(Math.min(totalPages, currentPage + 2))}
					disabled={currentPage === totalPages}
					className='p-2 mx-1 hover:bg-gray-300/20 hover:text-white rounded-lg'
				>
					&gt;&gt;
				</button>
			</div>
		</>
	);
};

export default Pagination;
