import React, { useMemo, useCallback, FC } from 'react';
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react';
import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import Toolbar from './Toolbar';
import { CustomElement, CustomText } from '@/types/custom-type';

interface EditorComponentProps {
  initialValue: Descendant[];
  onChange: (value: Descendant[]) => void;
}

const EditorComponent: FC<EditorComponentProps> = ({ initialValue, onChange }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const renderElement = useCallback((props: RenderElementProps) => {
    const element = props.element as CustomElement;
    switch (element.type) {
      case 'image':
        return <ImageElement {...props} />;
      case 'link':
        return <LinkElement {...props} />;
      case 'ordered-list':
      case 'unordered-list':
        return <ListElement {...props} />;
      case 'list-item':
        return <ListItemElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate editor={editor} initialValue={initialValue} onChange={onChange}>
      <Toolbar />
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} placeholder="Enter some text..." />
    </Slate>
  );
};

const DefaultElement: FC<RenderElementProps> = props => <p {...props.attributes}>{props.children}</p>;

const ImageElement: FC<RenderElementProps> = ({ attributes, children, element }) => {
  const elementWithUrl = element as { url: string };
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img src={elementWithUrl.url} alt="Image" style={{ maxWidth: '100%' }} />
      </div>
      {children}
    </div>
  );
};

const LinkElement: FC<RenderElementProps> = ({ attributes, children, element }) => {
  const elementWithUrl = element as { url: string };
  return (
    <a {...attributes} href={elementWithUrl.url}>
      {children}
    </a>
  );
};

const ListElement: FC<RenderElementProps> = props => {
  return (
    <ul {...props.attributes}>
      {props.children}
    </ul>
  );
};

const ListItemElement: FC<RenderElementProps> = props => {
  return (
    <li {...props.attributes}>
      {props.children}
    </li>
  );
};

const Leaf: FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

export default EditorComponent;
