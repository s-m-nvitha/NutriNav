import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  ...props 
}) => {
  const baseStyles = 'glass-card p-6';
  const hoverStyles = hover ? 'hover:shadow-2xl hover:scale-[1.02] transition-all duration-300' : '';
  
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
