import React, { ChangeEvent, useState } from 'react';
import { ReactEditor } from 'slate-react';
import {
  AiOutlinePicture, AiOutlineBold, AiOutlineItalic,
  AiOutlineUnderline, AiOutlineAlignLeft, AiOutlineAlignCenter,
  AiOutlineAlignRight, AiOutlineOrderedList, AiOutlineUnorderedList,
  AiOutlineLink, AiOutlineVideoCamera
} from 'react-icons/ai';
import {
  toggleFormat, toggleAlignment, toggleList, insertLink, insertImage,
  insertVideo, toggleTextColor, toggleBackgroundColor, toggleFontSize
} from '@/components/Editor/utils/utils';
import { MediaCallbackProps, TextFormat } from '@/components/Editor/types/type';
import { toast } from 'react-toastify';
import { Label } from '../Label/Label';
import ColorPicker from '../Input/ColorPicker';
import { Icon } from '../Icons/Icon';
import Button from '../Input/Botton';
import Select from '../Input/Select';
import { BaseEditor } from 'slate';
import { HistoryEditor } from 'slate-history';

export interface ToolbarComponentProps {
  onImageAddition: MediaCallbackProps;
  onVideoAddition: MediaCallbackProps;
  colorPalette: string[];
  editor: BaseEditor & ReactEditor & HistoryEditor;
}

const Toolbar: React.FC<ToolbarComponentProps> = ({ onImageAddition, onVideoAddition, colorPalette, editor }) => {
  
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState('16px');

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
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

  const handleTextColorChange = (color: string) => {
    setTextColor(color);
    toggleTextColor(editor, color);
  };

  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color);
    toggleBackgroundColor(editor, color);
  };

  const handleFontSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const size = event.target.value;
    setFontSize(size);
    toggleFontSize(editor, size);
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    onImageAddition(file, (error, url) => {
      if (error || !url) {
        toast.error('Error uploading image');
        console.error('Error uploading image:', error);
      } else {
        insertImage(editor, url);
        toast.success('Image uploaded successfully');
      }
    });
  };

  const handleVideoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    onVideoAddition(file, (error, url) => {
      if (error || !url) {
        toast.error('Error uploading video');
        console.error('Error uploading video:', error);
      } else {
        insertVideo(editor, url);
        toast.success('Video uploaded successfully');
      }
    });
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        id="image-upload"
        onChange={handleImageUpload}
      />
      <Label htmlFor="image-upload">
        <Icon><AiOutlinePicture /></Icon>
      </Label>
      <input
        type="file"
        accept="video/*"
        style={{ display: 'none' }}
        id="video-upload"
        onChange={handleVideoUpload}
      />
      <Label htmlFor="video-upload">
        <Icon><AiOutlineVideoCamera /></Icon>
      </Label>
      <Button onMouseDown={handleMouseDown} onClick={() => handleFormatClick('bold')}>
        <Icon><AiOutlineBold /></Icon>
      </Button>
      <Button onMouseDown={handleMouseDown} onClick={() => handleFormatClick('italic')}>
        <Icon><AiOutlineItalic /></Icon>
      </Button>
      <Button onMouseDown={handleMouseDown} onClick={() => handleFormatClick('underline')}>
        <Icon><AiOutlineUnderline /></Icon>
      </Button>
      <Button onMouseDown={handleMouseDown} onClick={() => handleAlignmentClick('left')}>
        <Icon><AiOutlineAlignLeft /></Icon>
      </Button>
      <Button onMouseDown={handleMouseDown} onClick={() => handleAlignmentClick('center')}>
        <Icon><AiOutlineAlignCenter /></Icon>
      </Button>
      <Button onMouseDown={handleMouseDown} onClick={() => handleAlignmentClick('right')}>
        <Icon><AiOutlineAlignRight /></Icon>
      </Button>
      <Button onMouseDown={handleMouseDown} onClick={() => handleListClick('ordered-list')}>
        <Icon><AiOutlineOrderedList /></Icon>
      </Button>
      <Button onMouseDown={handleMouseDown} onClick={() => handleListClick('unordered-list')}>
        <Icon><AiOutlineUnorderedList /></Icon>
      </Button>
      <Button onMouseDown={handleMouseDown} onClick={handleLinkClick}>
        <Icon><AiOutlineLink /></Icon>
      </Button>
      <ColorPicker
        colors={colorPalette}
        value={textColor}
        onChange={handleTextColorChange}
      />
      <ColorPicker
        colors={colorPalette}
        value={backgroundColor}
        onChange={handleBackgroundColorChange}
      />
      <Select
        value={fontSize}
        onChange={handleFontSizeChange}
        options={["12px", "14px", '18px', '24px', '32px', '48px']}
      />
    </div>
  );
};

export default Toolbar;