import { Editor, Transforms, Element as SlateElement } from 'slate';
import axios from 'axios';

export const withCustomPlugin = (editor: Editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element);
  };

  editor.insertData = async (data: DataTransfer) => {
    console.log('InsertData called'); // Log when insertData is called
    const { files } = data;

    if (files && files.length > 0) {
      console.log('File detected:', files[0]); // Log detected file
      const file = files[0];
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
        insertImage(editor, url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      console.log('No files detected, calling default insertData');
      insertData(data);
    }
  };

  return editor;
};

const insertImage = (editor: Editor, url: string) => {
  const text = { text: '' };
  const image: SlateElement = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
  console.log('Image node inserted:', image);
};
