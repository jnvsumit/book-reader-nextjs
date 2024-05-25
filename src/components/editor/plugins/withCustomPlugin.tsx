import { uploadMedia } from '@/apis/upload';
import { Editor, Transforms, Element as SlateElement } from 'slate';

export const withCustomPlugin = (editor: Editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === 'image' || element.type === 'video' ? true : isVoid(element);
  };

  editor.insertData = async (data: DataTransfer) => {
    const { files } = data;

    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await uploadMedia(formData);
        const url = response.data.url;
        insertImage(editor, `http://localhost:5001${url}`);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertImage = (editor: Editor, url: string) => {
  const text = { text: '' };
  const image: SlateElement = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
};
