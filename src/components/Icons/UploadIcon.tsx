import React, { ChangeEvent } from 'react';
import { FaUpload } from 'react-icons/fa';
import { css } from '@emotion/css';

interface UploadIconProps {
  onFileChange: (file: File) => void;
}

const UploadIcon: React.FC<UploadIconProps> = ({ onFileChange }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileChange(event.target.files[0]);
    }
  };

  return (
    <div className={css`
      position: relative;
      display: inline-block;
    `}>
      <FaUpload
        className={css`
          cursor: pointer;
          color: #555;
          transition: color 0.3s, transform 0.3s;
          &:hover {
            color: #000;
            transform: scale(1.2);
          }
        `}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={css`
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        `}
      />
    </div>
  );
};

export default UploadIcon;
