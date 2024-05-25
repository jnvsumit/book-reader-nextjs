import React, { ChangeEvent } from 'react';
import { useSlate } from 'slate-react';
import {
  AiOutlinePicture, AiOutlineBold, AiOutlineItalic,
  AiOutlineUnderline, AiOutlineAlignLeft, AiOutlineAlignCenter,
  AiOutlineAlignRight, AiOutlineOrderedList, AiOutlineUnorderedList,
  AiOutlineLink,
  AiOutlineVideoCamera
} from 'react-icons/ai';
import { toggleFormat, toggleAlignment, toggleList, insertLink, insertImage, insertVideo } from './utils/utils';
import { Button, Icon } from '../components';
import { Label } from '../Label';
import { TextFormat } from './types/type';
import axios from 'axios';

const Toolbar: React.FC = () => {
  const editor = useSlate();

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        console.log('Uploading image file...');
        const response = await axios.post('http://localhost:5001/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const url = response.data.url;
        console.log('Image uploaded successfully:', url);
        insertImage(editor, `http://localhost:5001${url}`);
      } catch (error) {
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
        console.log('Uploading video file...');
        const response = await axios.post('http://localhost:5001/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const url = response.data.url;
        console.log('Video uploaded successfully:', url);
        insertVideo(editor, `http://localhost:5001${url}`);
      } catch (error) {
        console.error('Error uploading image:', error);
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
    </div>
  );
};

export default Toolbar;
