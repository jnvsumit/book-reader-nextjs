import { Editor, Transforms, Node, Element as SlateElement } from 'slate';

export const withMedia = (editor: Editor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
    if (SlateElement.isElement(node) && (node.type === 'image')) {
      // Custom handling for media nodes
      console.log('Media node inserted:', node);
      // Add your logic to handle media node insertion here, e.g., extracting and saving
    }

    // Call the original `normalizeNode` to ensure the rest of the editor works as expected
    normalizeNode([node, path]);
  };

  return editor;
};
