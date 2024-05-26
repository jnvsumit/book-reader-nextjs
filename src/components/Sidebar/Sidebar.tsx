import React, { useState } from 'react';
import { css } from '@emotion/css';
import { motion } from 'framer-motion';
import { IPage } from '@/interfaces/book';
import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';

export interface SidebarProps {
    pages: IPage[];
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, pages, toggleSidebar }) => {
  return (
    <div className={css`
      display: flex;
      flex-direction: column;
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      width: ${isOpen ? '250px' : '50px'};
      transition: width 0.3s;
      background-color: #333;
      color: white;
      z-index: 1000;
    `}>
      <button onClick={toggleSidebar} className={css`
        background: none;
        border: none;
        color: white;
        font-size: 1.5em;
        cursor: pointer;
        padding: 10px;
        &:hover {
          background-color: #444;
        }
      `}>
        ☰
      </button>
      {isOpen && (
        <div className={css`
          display: flex;
          flex-direction: column;
          margin-top: 20px;
        `}>
          {pages.map((page) => (
            <Link
              href={`${page.pageId}`} 
              key={page.pageId}
              className={css`
                padding: 15px;
                text-decoration: none;
                color: white;
                &:hover {
                  background-color: #555;
                }
              `}
            >
              {page.title}
            </Link>
          ))}
          {
            <Link
              href='add-page'
              key='add-page'
              className={css`
                padding: 15px;
                text-decoration: none;
                color: white;
                &:hover {
                  background-color: #555;
                }
              `}
            >
            {
              <FaPlus color='red' />
            }
          </Link>
          }
        </div>
      )}
    </div>
  );
};

export default Sidebar;
