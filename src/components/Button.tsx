import React from 'react';

function Button({
    children,
    className = '',
    ...props
}) {
    return (
        <button className={`btn bg-blue-700 hover:bg-blue-800 cursor-pointer my-4 ${className}`} {...props}>
            {children}
        </button>
    );
}

export default Button;
