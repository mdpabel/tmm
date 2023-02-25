'use client';

import React, { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import { useFocus } from './../hooks/useFocus';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  validation?: object;
  focus?: boolean;
}

const Input = ({
  placeholder,
  onChange,
  value = '',
  type = 'text',
  focus,
  id,
  min,
  minLength,
  max,
  maxLength,
  pattern,
}: InputProps) => {
  const inputRef = useFocus();

  const restProps = focus ? { ref: inputRef } : {};

  return (
    <input
      pattern={pattern}
      min={min}
      max={max}
      minLength={minLength}
      maxLength={maxLength}
      role='input'
      className='w-full py-2 pl-3 mt-2 text-xs leading-none text-gray-900 border rounded font-base md:py-2 md:text-base focus:outline-none'
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange(e)}
      placeholder={placeholder}
      required
    />
  );
};

export interface OptionType {
  label: string;
  value: string;
}

interface SelectType {
  options: OptionType[];
  onChange: (val: string) => void;
  required?: boolean;
  value?: string;
}

export const Select = ({ options, onChange, required, value }: SelectType) => {
  return (
    <select
      value={value}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      className='w-full py-2 pl-3 mt-2 text-xs leading-none text-gray-900 border rounded font-base md:py-2 md:text-base focus:outline-none'
      name='cars'
      id='cars'
    >
      {options.map(({ value, label }) => (
        <option key={label} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export const InputWrapper = ({ children }: { children: ReactNode }) => {
  return <div className='flex flex-col space-y-2'>{children}</div>;
};

interface LabelType {
  children: ReactNode;
  htmlFor: string;
}

export const Label = ({ children, htmlFor }: LabelType) => {
  return (
    <label className='text-sm font-semibold text-gray-700' htmlFor={htmlFor}>
      {children}
    </label>
  );
};

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  validation?: object;
  focus?: boolean;
}

export const TextArea = ({
  placeholder,
  id,
  value = '',
  onChange,
}: TextAreaProps) => {
  return (
    <textarea
      value={value}
      rows={4}
      onChange={(e) => onChange(e)}
      className='w-full px-4 py-2 mt-2 border-2 border-solid rounded outline-none text-md border-gray focus:border-gray-300'
      placeholder={placeholder}
      id={id}
    />
  );
};

export default Input;
