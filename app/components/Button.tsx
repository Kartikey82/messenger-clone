'use client';

import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  secondary?: boolean;
  danger?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  fullWidth = false,
  children,
  onClick,
  secondary = false,
  danger = false,
  disabled = false,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        'flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        disabled && 'opacity-50 cursor-not-allowed',
        fullWidth && 'w-full',
        secondary
          ? 'text-gray-900'
          : danger
          ? 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600 text-white'
          : 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600 text-white'
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
