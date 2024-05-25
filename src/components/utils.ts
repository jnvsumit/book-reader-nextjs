import { Editor, Transforms, Text, Node, Range, Element as SlateElement } from 'slate';
import { TextFormat } from '../types/custom-type';

export const toggleFormat = (editor: Editor, format: TextFormat) => {
    const isActive = isFormatActive(editor, format);
    console.log(`Toggling format: ${format}, Active: ${isActive}`);
    
    Transforms.setNodes(
      editor,
      { [format]: isActive ? null : true } as Partial<Text>,
      { match: n => Text.isText(n), split: true }
    );
};
  
const isFormatActive = (editor: Editor, format: TextFormat) => {
    const [match] = Editor.nodes(editor, {
      match: n => Text.isText(n) && (n as Text)[format] === true,
      universal: true,
    });
    console.log(`Format active check for ${format}: ${!!match}`);
    return !!match;
};

export const toggleAlignment = (editor: Editor, alignment: string) => {
  const isActive = isAlignmentActive(editor, alignment);
  Transforms.setNodes(
    editor,
    { align: isActive ? null : alignment } as Partial<SlateElement>,
    { match: n => Editor.isBlock(editor, n) && SlateElement.isElement(n) }
  );
};

const isAlignmentActive = (editor: Editor, alignment: string) => {
  const [match] = Editor.nodes(editor, {
    match: n => SlateElement.isElement(n) && n.align === alignment,
  });
  return !!match;
};

export const toggleList = (editor: Editor, listType: string) => {
  const isActive = isListActive(editor, listType);
  Transforms.unwrapNodes(editor, {
    match: n => SlateElement.isElement(n) && n.type === 'list-item',
    split: true,
  });
  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : 'list-item',
  };
  Transforms.setNodes(editor, newProperties);
  if (!isActive) {
    const block = { type: listType, children: [] } as SlateElement;
    Transforms.wrapNodes(editor, block);
  }
};

const isListActive = (editor: Editor, listType: string) => {
  const [match] = Editor.nodes(editor, {
    match: n => SlateElement.isElement(n) && n.type === listType,
  });
  return !!match;
};

export const insertLink = (editor: Editor, url: string) => {
  if (!url) return;
  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);

  if (isCollapsed) {
    Transforms.insertNodes(editor, {
      type: 'link',
      url,
      children: [{ text: url }],
    } as SlateElement);
  } else {
    Transforms.wrapNodes(
      editor,
      {
        type: 'link',
        url,
        children: [],
      } as SlateElement,
      { split: true }
    );
    Transforms.collapse(editor, { edge: 'end' });
  }
};

export const isLinkActive = (editor: Editor) => {
  const [link] = Editor.nodes(editor, { match: n => SlateElement.isElement(n) && n.type === 'link' });
  return !!link;
};

export const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, { match: n => SlateElement.isElement(n) && n.type === 'link' });
};

export const insertImage = (editor: Editor, url: string) => {
  const text = { text: '' };
  const image: SlateElement = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
};

export const insertVideo = (editor: Editor, url: string) => {
  const text = { text: '' };
  const video: SlateElement = { type: 'video', url, children: [text] };
  Transforms.insertNodes(editor, video);
};


export const isImageUrl = (url: string): Promise<boolean> => {
  return fetch(url, { method: 'HEAD' })
    .then(res => res.headers.get('Content-Type')?.startsWith('image') || false)
    .catch(() => false);
}

export const isVideoUrl = (url: string): Promise<boolean> => {
  return fetch(url, { method: 'HEAD' })
    .then(res => res.headers.get('Content-Type')?.startsWith('video') || false)
    .catch(() => false);
}
