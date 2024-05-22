import React, { ChangeEvent } from 'react';
import { useSlate } from 'slate-react';
import {
  AiOutlinePicture, AiOutlineBold, AiOutlineItalic,
  AiOutlineUnderline, AiOutlineAlignLeft, AiOutlineAlignCenter,
  AiOutlineAlignRight, AiOutlineOrderedList, AiOutlineUnorderedList,
  AiOutlineLink
} from 'react-icons/ai';
import { insertImage, toggleFormat, toggleAlignment, toggleList, insertLink } from './utils';
import { Button, Icon } from './components';
import { Label } from './Label';
import { TextFormat } from '../types/custom-type';

const Toolbar: React.FC = () => {
  const editor = useSlate();

  const handleImageClick = () => {
    const url = window.prompt('Enter the URL of the image:');
    if (!url) return;
    insertImage(editor, url);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        insertImage(editor, url);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormatClick = (format: TextFormat) => {
    toggleFormat(editor, format);
  };

  const handleAlignmentClick = (alignment: string) => {
    toggleAlignment(editor, alignment);
  };

  const handleListClick = (listType: string) => {
    toggleList(editor, listType);
  };

  const handleLinkClick = () => {
    const url = window.prompt('Enter the URL:');
    if (!url) return;
    insertLink(editor, url);
  };

  return (
    <div>
      <Button onMouseDown={handleImageClick}>
        <Icon><AiOutlinePicture /></Icon>
      </Button>
      <Button onMouseDown={() => handleFormatClick('bold')}>
        <Icon><AiOutlineBold /></Icon>
      </Button>
      <Button onMouseDown={() => handleFormatClick('italic')}>
        <Icon><AiOutlineItalic /></Icon>
      </Button>
      <Button onMouseDown={() => handleFormatClick('underline')}>
        <Icon><AiOutlineUnderline /></Icon>
      </Button>
      <Button onMouseDown={() => handleAlignmentClick('left')}>
        <Icon><AiOutlineAlignLeft /></Icon>
      </Button>
      <Button onMouseDown={() => handleAlignmentClick('center')}>
        <Icon><AiOutlineAlignCenter /></Icon>
      </Button>
      <Button onMouseDown={() => handleAlignmentClick('right')}>
        <Icon><AiOutlineAlignRight /></Icon>
      </Button>
      <Button onMouseDown={() => handleListClick('ordered-list')}>
        <Icon><AiOutlineOrderedList /></Icon>
      </Button>
      <Button onMouseDown={() => handleListClick('unordered-list')}>
        <Icon><AiOutlineUnorderedList /></Icon>
      </Button>
      <Button onMouseDown={handleLinkClick}>
        <Icon><AiOutlineLink /></Icon>
      </Button>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        id="file-upload"
        onChange={handleImageUpload}
      />
      <Label htmlFor="file-upload">
        <Icon><AiOutlinePicture /></Icon> Upload
      </Label>
    </div>
  );
};

export default Toolbar;
