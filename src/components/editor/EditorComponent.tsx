import React, { useMemo, useCallback, FC } from 'react';
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react';
import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import { withCustomPlugin } from './plugins/withCustomPlugin';
import Toolbar from './Toolbar';
import { CustomElement, CustomText } from '@/components/editor/types/type';
import { indentList, outdentList } from './utils/utils';

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
      case 'ordered-list':
        return <OrderedListElement {...props} />;
      case 'unordered-list':
        return <UnorderedListElement {...props} />;
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
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some text..."
        onKeyDown={(event) => handleKeyDown(event, editor)}
      />
    </Slate>
  );
};

const DefaultElement: FC<RenderElementProps> = ({ attributes, children, element }) => {
  const style = { textAlign: element.align as 'left' | 'center' | 'right' };
  return (
    <div {...attributes} style={style}>
      {children}
    </div>
  );
};

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

const OrderedListElement: FC<RenderElementProps> = (props) => (
  <ol {...props.attributes}>{props.children}</ol>
);

const UnorderedListElement: FC<RenderElementProps> = (props) => (
  <ul {...props.attributes}>{props.children}</ul>
);

const ListItemElement: FC<RenderElementProps> = (props) => (
  <li {...props.attributes}>{props.children}</li>
);

const Leaf: FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
  let style: React.CSSProperties = {};

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.color) {
    style.color = leaf.color;
  }
  if (leaf.backgroundColor) {
    style.backgroundColor = leaf.backgroundColor;
  }
  if (leaf.fontSize) {
    style.fontSize = leaf.fontSize;
  }

  return <span {...attributes} style={style}>{children}</span>;
};

export default EditorComponent;

const handleKeyDown = (event: React.KeyboardEvent, editor: any) => {
  if (event.key === 'Tab') {
    event.preventDefault();
    if (event.shiftKey) {
      outdentList(editor);
    } else {
      indentList(editor);
    }
  }
};
