import React, { LabelHTMLAttributes, ReactNode } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export const Label: React.FC<LabelProps> = ({ children, ...props }) => (
  <label {...props} style={{ display: 'inline-block', padding: '8px', margin: '0 4px', background: '#fff', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}>
    {children}
  </label>
);
