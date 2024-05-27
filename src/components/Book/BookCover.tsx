import React, { useState } from 'react';
import { css } from '@emotion/css';
import { motion } from 'framer-motion';
import UploadIcon from '../Icons/UploadIcon';
import EditIcon from '../Icons/EditIcon';

export interface BookCoverProps {
  title: string;
  author: string;
  image: string;
  description: string;
  isEditMode: boolean;
  onTitleEdit: (newTitle: string) => void;
  onAuthorEdit: (newAuthor: string) => void;
  onDescriptionEdit: (newDescription: string) => void;
  onImageUpload: (file: File) => void;
}

const BookCover: React.FC<BookCoverProps> = ({
  title,
  author,
  image,
  description,
  isEditMode,
  onTitleEdit,
  onAuthorEdit,
  onDescriptionEdit,
  onImageUpload
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingAuthor, setIsEditingAuthor] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [authorValue, setAuthorValue] = useState(author);
  const [descriptionValue, setDescriptionValue] = useState(description);

  const handleTitleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onTitleEdit(titleValue);
      setIsEditingTitle(false);
    }
  };

  const handleAuthorKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAuthorEdit(authorValue);
      setIsEditingAuthor(false);
    }
  };

  const handleDescriptionKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onDescriptionEdit(descriptionValue);
      setIsEditingDescription(false);
    }
  };

  return (
    <div className={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      transition: transform 0.3s;
      &:hover {
        transform: translateY(-10px);
      }
    `}>
      <motion.div 
        className={css`
          position: relative;
        `}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', damping: 10 }}
      >
        <img 
          src={image} 
          alt={`${title} cover`} 
          className={css`
            width: 40%;
            margin: 20px;
            height: auto;
            border-radius: 8px;
          `}
        />
        {isEditMode && (
          <div className={css`
            position: absolute;
            top: 10px;
            right: 10px;
          `}>
            <UploadIcon onFileChange={onImageUpload} />
          </div>
        )}
      </motion.div>
      <div className={css`position: relative;`}>
        {isEditingTitle ? (
          <input
            type="text"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            onKeyPress={handleTitleKeyPress}
            className={css`
              font-size: 1.5em;
              margin: 15px 0 5px 0;
              color: #333;
              text-align: center;
              border: none;
              outline: none;
              background-color: inherit;
            `}
            onBlur={() => setIsEditingTitle(false)}
            autoFocus
          />
        ) : (
          <>
            <h2 className={css`
              font-size: 1.5em;
              margin: 15px 0 5px 0;
              color: #333;
            `}>{title}</h2>
            {isEditMode && <EditIcon onClick={() => setIsEditingTitle(true)} />}
          </>
        )}
      </div>
      <div className={css`position: relative;`}>
        {isEditingAuthor ? (
          <input
            type="text"
            value={authorValue}
            onChange={(e) => setAuthorValue(e.target.value)}
            onKeyPress={handleAuthorKeyPress}
            className={css`
              font-size: 1.2em;
              margin: 0;
              color: #777;
              text-align: center;
              border: none;
              outline: none;
              background-color: inherit;
            `}
            onBlur={() => setIsEditingAuthor(false)}
            autoFocus
          />
        ) : (
          <>
            <h3 className={css`
              font-size: 1.2em;
              margin: 0;
              color: #777;
            `}>{author}</h3>
            {isEditMode && <EditIcon onClick={() => setIsEditingAuthor(true)} />}
          </>
        )}
      </div>
      <div className={css`position: relative;`}>
        {isEditingDescription ? (
          <textarea
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
            onKeyPress={handleDescriptionKeyPress}
            className={css`
              font-size: 1em;
              margin: 10px 0;
              color: #555;
              cols: 50;
              text-align: center;
              border: none;
              outline: none;
              background-color: inherit;
            `}
            onBlur={() => setIsEditingDescription(false)}
            autoFocus
          />
        ) : (
          <>
            <p className={css`
              font-size: 1em;
              margin: 10px 0;
              color: #555;
            `}>{description}</p>
            {isEditMode && <EditIcon onClick={() => setIsEditingDescription(true)} />}
          </>
        )}
      </div>
    </div>
  );
};

export default BookCover;