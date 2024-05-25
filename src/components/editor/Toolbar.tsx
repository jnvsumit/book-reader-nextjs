import React, { ChangeEvent, useState } from 'react';
import { useSlate } from 'slate-react';
import {
  AiOutlinePicture, AiOutlineBold, AiOutlineItalic,
  AiOutlineUnderline, AiOutlineAlignLeft, AiOutlineAlignCenter,
  AiOutlineAlignRight, AiOutlineOrderedList, AiOutlineUnorderedList,
  AiOutlineLink, AiOutlineVideoCamera
} from 'react-icons/ai';
import {
  toggleFormat, toggleAlignment, toggleList, insertLink, insertImage,
  insertVideo, toggleTextColor, toggleBackgroundColor, toggleFontSize
} from './utils/utils';
import { TextFormat } from './types/type';
import { uploadMedia } from '@/apis/upload';
import { toast } from 'react-toastify';
import { Label } from '../Label';
import ColorPicker from '../Input/ColorPicker';
import { Icon } from '../Icons/Icon';
import Button from '../Input/Botton';
import Select from '../Input/Select';

const colorPalette = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFA500', '#800080', '#00FFFF', '#FFC0CB', '#808080', '#000000'];

const Toolbar: React.FC = () => {
  const editor = useSlate();
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState('16px');

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await uploadMedia(formData);
        const url = response.data.url;
        insertImage(editor, `http://localhost:5001${url}`);
        toast.success('Image uploaded successfully');
      } catch (error) {
        toast.error('Error uploading image');
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleVideoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await uploadMedia(formData);
        const url = response.data.url;
        insertVideo(editor, `http://localhost:5001${url}`);
        toast.success('Video uploaded successfully');
      } catch (error) {
        toast.error('Error uploading video');
        console.error('Error uploading video:', error);
      }
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