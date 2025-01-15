import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  bg?: string;
  color?: string;
  className?: string;
  onClick?: () => void;
};

const Button = ({ children, type, bg = 'bg-darkBlue', color = 'text-white', className = '', onClick }: ButtonProps) => {
  return (
    <button
    onClick={onClick}
      type={type}
      className={`px-4 py-2 rounded-lg font-inter font-regular h-[48px] ${bg} ${color} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
