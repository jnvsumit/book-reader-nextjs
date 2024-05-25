"use client"
import '@fortawesome/fontawesome-free/css/all.min.css'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './page.module.css'
import { INITIAL_BOOK_STATE } from '@/constants/initiate.state'
import { IBook } from '@/interfaces/book'
import { saveBook } from '@/apis/book'
import { message } from '@/constants/toast.message'

export default function AddBookPage() {
  const router = useRouter();
  const [bookDetails, setBookDetails] = useState<IBook>(INITIAL_BOOK_STATE);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };

  const handleSave = async () => {
      const response = await saveBook(bookDetails);

      if (response.success) {
        toast.success(message.book.added.success, {
          autoClose: 5000,
          onClose: () => router.push(`/book/${response.data.bookId}?from=add-book`)
        });
      } else {
        toast.error(message.book.added.failed);
      }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <motion.div transition={{ type: 'spring', damping: 40, mass: 0.75 }}
      initial={{ opacity: 0, x: 1000 }} animate={{ opacity: 1, x: 0 }}>
      <motion.section transition={{ type: 'spring', damping: 44, mass: 0.75 }}
        initial={{ opacity: 0, y: -1000 }} animate={{ opacity: 1, y: 0 }} className={styles.appBar}>
        <div className={styles.leftIcons} onClick={handleBack}>
          <i style={{ fontSize: '20px', cursor: 'pointer' }} className="fas fa-chevron-left"></i>
        </div>
        <div className={styles.title}>
          <h2 className={styles.titleStyles}>Add a New Book</h2>
        </div>
        <div className={styles.icons}>
          <button className={styles.saveButton} onClick={handleSave}>Save</button>
        </div>
      </motion.section>

      <div className={styles.formContainer}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={bookDetails.title}
          onChange={handleInputChange}
          className={styles.inputField}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={bookDetails.author}
          onChange={handleInputChange}
          className={styles.inputField}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={bookDetails.image}
          onChange={handleInputChange}
          className={styles.inputField}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={bookDetails.description}
          onChange={handleInputChange}
          className={styles.textareaField}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={bookDetails.content}
          onChange={handleInputChange}
          className={styles.textareaField}
        />
      </div>

      <ToastContainer />
    </motion.div>
  )
}

const iconStyle = { marginRight: '20px', fontSize: '20px' }
