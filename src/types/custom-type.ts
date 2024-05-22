import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

export type CustomElement = { type: 'paragraph' | 'image' | 'link' | 'list-item' | 'ordered-list' | 'unordered-list'; align?: string; url?: string; children: CustomText[] }
export type CustomText = { text: string; bold?: boolean; italic?: boolean; underline?: boolean; }

export type TextFormat = 'bold' | 'italic' | 'underline';

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor & Node;
    Element: CustomElement;
    Text: CustomText;
  }
}
