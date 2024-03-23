import React from 'react';

function Button({
    children,
    className = '',
    ...props
}) {
    return (
        <div className='w-full flex items-center justify-center p-2'>
            <button className={`btn bg-blue-700 hover:bg-blue-800 cursor-pointer ${className}`} {...props}>
                {children}
            </button>
        </div>
    );
}

export default Button;
