import React, { ReactNode } from 'react';

interface IconProps {
  children: ReactNode;
}

export const Icon: React.FC<IconProps> = ({ children }) => (
  <span style={{ fontSize: '18px', verticalAlign: 'middle' }}>{children}</span>
);
