import React, { FC, HTMLAttributes } from 'react';
import { VariantProps, cva } from 'class-variance-authority';

const buttonStyles = cva(
  ['font-medium', 'border', 'rounded', 'flex', 'items-center', 'gap-2'],
  {
    variants: {
      intent: {
        primary: [
          'bg-indigo-500',
          'text-white',
          'border-transparent',
          'hover:bg-indigo-600',
        ],
        secondary: [
          'bg-purple-800',
          'text-white',
          'border-transparent',
          'hover:bg-violet-600',
        ],
        logout: ['bg-gray-200', 'text-black', 'hover:bg-gray-50'],
      },
      size: {
        small: ['text-sm', 'py-1', 'px-2'],
        medium: ['text-base', 'py-2', 'px-4'],
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  }
);

//
interface ButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  type?: 'button' | 'submit' | 'reset';
  intent?: 'primary' | 'secondary' | 'logout';
  size?: 'medium' | 'small';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  intent,
  size,
  type,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      style={{
        cursor: `${disabled ? 'not-allowed' : 'pointer'}`,
      }}
      onClick={onClick}
      type={type}
      className={buttonStyles({ intent, size })}
    >
      {children}
    </button>
  );
};

export default Button;
