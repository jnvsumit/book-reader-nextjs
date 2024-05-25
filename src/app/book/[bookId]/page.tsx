"use client"
import '@fortawesome/fontawesome-free/css/all.min.css'
import { motion } from 'framer-motion'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EditorComponent from '@/components/EditorComponent'
import styles from './page.module.css'
import { IBook, INITIAL_BOOK_STATE } from '@/constants/initiate.state'
import axios from 'axios'
import { Descendant } from 'slate';

const INITIAL_EDITOR_STATE: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const BookPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { bookId } = useParams() as { bookId: string };
  const [editorValue, setEditorValue] = useState<Descendant[]>(INITIAL_EDITOR_STATE);
  const [selectedBook, setSelectedBook] = useState<IBook>(INITIAL_BOOK_STATE);

  useEffect(() => {
    if (bookId) {
      axios.get(`http://localhost:5001/api/books/${bookId}`)
        .then(response => {
          setSelectedBook(response.data);
          setEditorValue(response.data.content ? JSON.parse(response.data.content) : INITIAL_EDITOR_STATE);
        })
        .catch(error => {
          console.error('Error fetching book:', error);
        });
    }
  }, [bookId]);

  const handleSave = async () => {
    console.log(JSON.stringify(editorValue));
    
    const content = JSON.stringify(editorValue);
    try {
      const response = await axios.put(`http://localhost:5001/api/books/${bookId}`, {
        content
      });
      toast.success("Book updated successfully!", {
        autoClose: 5000
      });
    } catch (error) {
      toast.error("Failed to add the book.");
    }
  }

  const onChange = (value: Descendant[]) => {
    console.log(value);
    
    setEditorValue(value)
  }

  const handleBack = () => {
    if (searchParams.get('from') === 'add-book') {
      router.push('/');
    } else {
      router.back();
    }
  }

  if (!selectedBook.bookId) return <p>Book not found</p>;

  return (
    <motion.div transition={{ type: 'spring', damping: 40, mass: 0.75 }}
      initial={{ opacity: 0, x: 1000 }} animate={{ opacity: 1, x: 0 }}>
      <motion.section transition={{ type: 'spring', damping: 44, mass: 0.75 }}
        initial={{ opacity: 0, y: -1000 }} animate={{ opacity: 1, y: 0 }} className={styles.appBar}>
        <div className={styles.leftIcons} onClick={handleBack}>
          <i style={{ fontSize: '20px', cursor: 'pointer' }} className="fas fa-chevron-left"></i>
        </div>
        <div className={styles.title}>
          <h2 className={styles.titleStyles}>{selectedBook.title}</h2>
        </div>
        <div className={styles.icons}>
          <button className={styles.saveButton} onClick={handleSave}>Save</button>
          <i style={iconStyle} className="fas fa-cog"></i>
          <i style={iconStyle} className="fas fa-share"></i>
          <i style={iconStyle} className="fas fa-search"></i>
        </div>
      </motion.section>

      <EditorComponent initialValue={editorValue} onChange={onChange} />
      <ToastContainer />
    </motion.div>
  )
}

const iconStyle = { marginRight: '20px', fontSize: '20px' }

export default BookPage;
