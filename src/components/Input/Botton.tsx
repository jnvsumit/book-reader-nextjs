import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { css } from '@emotion/css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  active?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, active, ...props }) => (
    <button
      {...props}
      className={css`
        display: inline-block;
        padding: 8px;
        margin: 0 4px;
        background: ${active ? '#ddd' : '#fff'};
        border: 1px solid ${active ? '#aaa' : '#ddd'};
        border-radius: 4px;
        cursor: pointer;
        &:hover {
          background: #f0f0f0;
        }
      `}
    >
      {children}
    </button>
  );

export default Button;