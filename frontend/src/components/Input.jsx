import React from 'react';
import { FiMail, FiLock, FiEye } from "react-icons/fi";

const Input = ({ 
  label, 
  type = 'text', 
  placeholder = '', 
  value = '', 
  onChange, 
  error = '',
  className = '',
  required = false,
  ...props 
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="text-[15px] font-semibold text-gray-900 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">

    {type === "email" && (
        <FiMail
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
        />
    )}

    {type === "password" && (
        <FiLock
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
        />
    )}

    <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
  w-full
  h-[54px]
  rounded-xl
  border
  border-gray-300
  pl-14
  pr-14
  text-base
  placeholder:text-gray-400
  transition-all
  duration-200
  ease-in-out
  focus:outline-none
  focus:border-gray-300
`}
        {...props}
    />

    {type === "password" && (
        <FiEye
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            size={20}
        />
    )}

</div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
