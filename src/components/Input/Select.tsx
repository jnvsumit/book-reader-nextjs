import React, { SelectHTMLAttributes } from 'react';
import { css } from '@emotion/css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  active?: boolean;
  options: string[];
}

const Select: React.FC<SelectProps> = ({ options, active, ...props }) => (
  <select
    {...props}
    className={css`
      display: inline-block;
      padding: 8px;
      margin: 0 4px;
      border-radius: 4px;
      border: 1px solid ${active ? '#aaa' : '#ddd'};
      background: ${active ? '#ddd' : '#fff'};
      cursor: pointer;
      &:hover {
        background: #f0f0f0;
      }
      &:focus {
        outline: none;
        border-color: #aaa;
      }
    `}
  >
    {options.map(option => (
      <option
        key={option}
        value={option}
        className={css`
          padding: 8px;
          background: #fff;
          &:hover {
            background: #f0f0f0;
          }
          &:checked {
            background: #ddd;
          }
        `}
      >
        {option}
      </option>
    ))}
  </select>
);

export default Select;
