import React from 'react';
import { css } from '@emotion/css';
import { motion } from 'framer-motion';

export interface BookCoverProps {
    title: string;
    author: string;
    image: string;
    description: string;
}

const BookCover: React.FC<BookCoverProps> = ({ title, author, image, description }) => {
  return (
    <div className={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #f8f8f8;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      max-width: 300px;
      text-align: center;
      transition: transform 0.3s;
      &:hover {
        transform: translateY(-10px);
      }
    `}>
      <motion.img 
        src={image} 
        alt={`${title} cover`} 
        className={css`
          width: 100%;
          height: auto;
          border-radius: 8px;
        `}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', damping: 10 }}
      />
      <h2 className={css`
        font-size: 1.5em;
        margin: 15px 0 5px 0;
        color: #333;
      `}>{title}</h2>
      <h3 className={css`
        font-size: 1.2em;
        margin: 0;
        color: #777;
      `}>{author}</h3>
      <p className={css`
        font-size: 1em;
        margin: 10px 0;
        color: #555;
      `}>{description}</p>
    </div>
  );
};

export default BookCover;
