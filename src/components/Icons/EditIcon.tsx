import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { css } from '@emotion/css';

interface EditIconProps {
  onClick: () => void;
}

const EditIcon: React.FC<EditIconProps> = ({ onClick }) => {
  return (
    <FaEdit
      className={css`
        cursor: pointer;
        color: #555;
        transition: color 0.3s, transform 0.3s;
        position: absolute;
        right: -25px;
        top: 50%;
        transform: translateY(-50%);
        &:hover {
          color: #000;
          transform: scale(1.2) translateY(-50%);
        }
      `}
      onClick={onClick}
    />
  );
};

export default EditIcon;
