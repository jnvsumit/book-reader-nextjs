"use client"
import BookCard from '@/components/Book/BookCard'
import Header from '@/components/Header/Header'
import Navbar from '@/components/Navbar/Navbar'
import { motion } from 'framer-motion'
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import AddBookCard from '@/components/Book/AddBookCard'
import { IBook } from '@/interfaces/book'
import { getBooks } from '@/apis/book'
import { INITIAL_PAGE_NUMBER } from '@/constants/initiate.state'

export default function Home() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [page, setPage] = useState(INITIAL_PAGE_NUMBER);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      const response = await getBooks(page, 2);

      if (response.success) {
        console.log("Fetching books", page);
        
        setBooks(prevBooks => {
          const books = [...prevBooks, ...response.data.books];
          const bookIdSet = new Set<string>();

          const _out: IBook[] = [];

          books.forEach(book => {
            if (!bookIdSet.has(book.bookId)) {
              _out.push(book);
            }

            bookIdSet.add(book.bookId);
          })

          return _out;
        });
      }
      
      setLoading(false);
    };

    fetchBooks();
  }, [page]);

  const handleScroll = () => {
    if (Math.abs(window.innerHeight + document.documentElement.scrollTop - document.documentElement.offsetHeight) < 1) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className={styles.main}>
      <div>
        <Header/>
        <div className={styles.containerStyle}>
          <Navbar/>

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
                  <a href={`/book/${book.bookId}/cover`} style={{ textDecoration: 'none' }}>
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
                  <AddBookCard />
                </a>
              </motion.li>
            </ul>
            {loading && <p>Loading more books...</p>}
          </div>
        </div>
      </div>
    </main>
  )
}
