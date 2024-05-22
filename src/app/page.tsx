"use client"
import BookCard from '@/components/BookCard'
import Header from '@/components/Header'
import SideBar from '@/components/SideBar'
import { motion } from 'framer-motion'
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { IBook } from '@/constants/initiate.state'
import AddBookCard from '@/components/AddBookCard'

export default function Home() {
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/books').then(data => {
      setBooks(data.data.books);
    });
  }, []);

  const handleAddBook = () => {
    
  };

  return (
    <main className={styles.main}>
      <div>
        <Header/>
        <div className={styles.containerStyle}>
          <section className={styles.content}>
            <SideBar/>
          </section>

          <div className={styles.grouper}>
            <h1 className={styles.title}>ALL BOOKS</h1>
            <ul className={styles.ulGroupStyle}>
              {books.map((book, i) =>
                <motion.li 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', damping: 50, mass: 0.75 }}
                  initial={{ opacity: 0, x: 200 * (i + 1) }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                >
                  <a href={`/book/${book.bookId}`} style={{ textDecoration: 'none' }}>
                    <BookCard title={book.title} coverImage={book.image} description={book.description} />
                  </a>
                </motion.li>
              )}
              <motion.li 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', damping: 50, mass: 0.75 }}
                initial={{ opacity: 0, x: 200 * (books.length + 1) }}
                animate={{ opacity: 1, x: 0 }}
                key={books.length}
              >
                <a href={`/add`} style={{ textDecoration: 'none' }}>
                  <AddBookCard onClick={handleAddBook} />
                </a>
              </motion.li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
