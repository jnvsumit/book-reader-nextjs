import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

export type CustomElement = 
  | { type: 'paragraph'; children: CustomText[] }
  | { type: 'image'; url: string; children: CustomText[] }
  | { type: 'video'; url: string; children: CustomText[] }
  | { type: 'link'; url: string; children: CustomText[] }
  | { type: 'list-item'; children: CustomText[] }
  | { type: 'ordered-list'; children: CustomText[] }
  | { type: 'unordered-list'; children: CustomText[] };

export type CustomText = { 
  text: string; 
  bold?: boolean; 
  italic?: boolean; 
  underline?: boolean;
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
};

export type TextFormat = 'bold' | 'italic' | 'underline' | 'color' | 'backgroundColor' | 'fontSize';

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
