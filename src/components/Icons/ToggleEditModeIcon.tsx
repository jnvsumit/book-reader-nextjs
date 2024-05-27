import React from 'react';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { css } from '@emotion/css';

interface ToggleEditModeIconProps {
  isEditMode: boolean;
  onToggle: () => void;
}

const ToggleEditModeIcon: React.FC<ToggleEditModeIconProps> = ({ isEditMode, onToggle }) => {
  return (
    <div className={css`
      position: fixed;
      top: 20px;
      right: 20px;
      cursor: pointer;
      z-index: 1000;
      transition: transform 0.3s;
      &:hover {
        transform: scale(1.2);
      }
    `} onClick={onToggle}>
      {isEditMode ? <FaToggleOn size={30} color="#4CAF50" /> : <FaToggleOff size={30} color="#F44336" />}
    </div>
  );
};

export default ToggleEditModeIcon;
