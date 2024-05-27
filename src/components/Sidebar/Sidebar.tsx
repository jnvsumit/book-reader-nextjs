import React from 'react';
import { css } from '@emotion/css';
import Link from 'next/link';
import { IBook, IPage } from '@/interfaces/book';
import { FaPlus } from 'react-icons/fa';

interface SidebarProps {
  book: IBook;
  isOpen: boolean;
  on: string; // cover OR page OR add-page
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, book, on, toggleSidebar }) => {
  return (
    <div className={css`
      display: flex;
      flex-direction: column;
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      width: ${isOpen ? '250px' : '50px'};
      transition: width 0.3s ease;
      background-color: #333;
      color: white;
      z-index: 1000;
    `}>
      <button
        onClick={toggleSidebar}
        className={css`
          background: none;
          border: none;
          color: white;
          font-size: 1.5em;
          cursor: pointer;
          padding: 10px;
          &:hover {
            background-color: #444;
          }
        `}
      >
        ☰
      </button>
      {isOpen && (
        <div
          className={css`
            display: flex;
            flex-direction: column;
            margin-top: 20px;
          `}
        >
          <Link
              href={`#`}
              key={book.bookId}
              className={css`
                padding: 15px;
                text-decoration: none;
                border-bottom: 1px solid #444;
                color: red;
                &:hover {
                  background-color: #444;
                }
              `}
            >
              {book.title}
            </Link>
          {book.pages.map((page) => (
            <Link
              href={`${book.bookId}/${page.pageId}`}
              key={page.pageId}
              className={css`
                padding: 15px;
                text-decoration: none;
                border-top: 1px solid #555;
                border-bottom: 1px solid #555;
                color: white;
                &:hover {
                  background-color: #555;
                }
              `}
            >
              {page.title}
            </Link>
          ))}
          <Link
            href='add-page'
            className={css`
              padding: 15px;
              text-decoration: none;
              border-top: 1px solid #555;
              border-bottom: 1px solid #555;
              color: #5ff123;
              &:hover {
                background-color: #555;
              }
            `}
          >
            <FaPlus /> Add page
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
