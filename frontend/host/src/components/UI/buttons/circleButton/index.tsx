import React from 'react';

type CircleButtonProps = {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  bg?: string;
  color?: string;
  size?: string;
  className?: string;
  onClick?: () => void;
};

const CircleButton = ({
  children,
  type,
  bg = 'bg-darkBlue',
  color = 'text-white',
  size = 'w-10 h-10',
  className = '',
  onClick,
}: CircleButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`flex items-center justify-center rounded-full font-inter font-regular ${bg} ${color} ${size} ${className}`}
    >
      {children}
    </button>
  );
};

export default CircleButton;
