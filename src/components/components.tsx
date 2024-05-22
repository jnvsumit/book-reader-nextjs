import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button {...props} style={{ display: 'inline-block', padding: '8px', margin: '0 4px', background: '#fff', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}>
    {children}
  </button>
);

interface IconProps {
  children: ReactNode;
}

export const Icon: React.FC<IconProps> = ({ children }) => (
  <span style={{ fontSize: '18px', verticalAlign: 'middle' }}>{children}</span>
);
