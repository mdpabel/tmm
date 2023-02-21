import React, { FC, ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

const alertStyles = cva(['text-center p-2 rounded mb-8 font-bold'], {
  variants: {
    intent: {
      success: [
        'bg-green-200 text-green-800 border border-green-800 before:content-["✓"] before:pr-2',
      ],
      danger: [
        'bg-red-200 text-red-800 border border-red-800 before:content-["X"] before:pr-2 ',
      ],
      warning: [
        'bg-yellow-200 text-yellow-800 border border-yellow-800 before:content-["X"] before:pr-2 ',
      ],
    },
  },
});

interface AlertProps extends VariantProps<typeof alertStyles> {
  children: ReactNode | any;
}

const Alert: FC<AlertProps> = ({ children, intent }) => {
  return <div className={alertStyles({ intent })}>{children}</div>;
};

export default Alert;