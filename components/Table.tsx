import { ChildrenType } from '@/types/reactTypes';
import clsx from 'clsx';
import { ReactNode } from 'react';

export const TableRow = ({
  children,
  index,
}: {
  children: ReactNode;
  index?: number;
}) => {
  return (
    <tr
      className={clsx({
        'h-12 text-sm leading-none text-gray-700 bg-white border-t border-b border-gray-200 hover:bg-gray-100':
          true,
        'bg-gray-50': index && index % 2 === 0,
      })}
    >
      {children}
    </tr>
  );
};

export const TableData = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <td className={`px-4 md:px-6 ${className}`}>{children}</td>;
};

export const HeadData = ({ children }: ChildrenType) => {
  return <th className='px-4 text-sm md:py-2 md:px-6'>{children}</th>;
};

export const TableBody = ({ children }: ChildrenType) => {
  return <tbody className='w-full'>{children}</tbody>;
};

export const TableHead = ({ children }: ChildrenType) => {
  return (
    <thead
      className={clsx({
        'text-xs text-gray-700 uppercase bg-gray-50': true,
      })}
    >
      {children}
    </thead>
  );
};

export const Table = ({ children }: ChildrenType) => {
  return (
    <table className='w-full shadow-md whitespace-nowrap'>{children}</table>
  );
};

export const TableWrapper = ({ children }: ChildrenType) => {
  return <div className='relative overflow-x-auto'>{children}</div>;
};
