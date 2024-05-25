import React, { useMemo, useCallback, FC } from 'react';
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react';
import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import { withCustomPlugin } from './plugins/withCustomPlugin';
import Toolbar from './Toolbar';
import { CustomElement, CustomText } from '@/components/editor/types/type';

interface EditorComponentProps {
  initialValue: Descendant[];
  onChange: (value: Descendant[]) => void;
}

const EditorComponent: FC<EditorComponentProps> = ({ initialValue, onChange }) => {
  const editor = useMemo(() => withCustomPlugin(withHistory(withReact(createEditor()))), []);

  const renderElement = useCallback((props: RenderElementProps) => {
    const element = props.element as CustomElement;
    switch (element.type) {
      case 'image':
        return <ImageElement {...props} />;
      case 'video':
        return <VideoElement {...props} />;
      case 'link':
        return <LinkElement {...props} />;
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

const VideoElement: FC<RenderElementProps> = ({ attributes, children, element }) => {
  const elementWithUrl = element as { url: string };
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <video controls style={{ maxWidth: '100%' }}>
          <source src={elementWithUrl.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
