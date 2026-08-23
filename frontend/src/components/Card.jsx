import React from 'react';

const Card = ({
  children,
  className = '',
  hover = false,
  ...props
}) => {
  const baseStyles =
    'bg-white border border-gray-200 rounded-2xl shadow-sm p-5';

  const hoverStyles = hover
    ? 'hover:shadow-md transition-shadow duration-200'
    : '';

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;