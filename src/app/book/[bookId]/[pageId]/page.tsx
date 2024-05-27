"use client"
import '@fortawesome/fontawesome-free/css/all.min.css'
import { motion } from 'framer-motion'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { css } from '@emotion/css';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Toolbar from '@/components/Editor/Toolbar';
import EditorComponent from '@/components/Editor/EditorComponent'
import Loader from '@/components/Loader/Loader'
import styles from './page.module.css'
import { INITIAL_BOOK_STATE, INITIAL_PAGE_STATE } from '@/constants/initiate.state'
import { Descendant } from 'slate';
import { IBook, IPage } from '@/interfaces/book'
import { getBookByBookId, updateBookByBookId } from '@/apis/book'
import { message } from '@/constants/toast.message'
import { uploadMedia } from '@/apis/upload'
import { MediaCallbackProps } from '@/components/Editor/types/type'
import Sidebar from '@/components/Sidebar/Sidebar'
import BookCover from '@/components/Book/BookCover'
import { addPage, getPageByPageId } from '@/apis/page'

const INITIAL_EDITOR_STATE: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const toolbarColorPalette = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFA500', '#800080', '#00FFFF', '#FFC0CB', '#808080', '#000000'];

const BookPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { bookId, pageId } = useParams() as { bookId: string, pageId: string };
  const [editorValue, setEditorValue] = useState<Descendant[]>(INITIAL_EDITOR_STATE);
  const [selectedBook, setSelectedBook] = useState<IBook>(INITIAL_BOOK_STATE);
  const [selectedPage, setSelectedPage] = useState<IPage>(INITIAL_PAGE_STATE);
  const [newPage, setNewPage] = useState<IPage>(INITIAL_PAGE_STATE);
  const [addPageToggle, setAddPageToggle] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (bookId) {
      getBookByBookId(bookId).then(response => {
        if (response.success) {
          setSelectedBook(response.data);
        } else {
          console.error('Error fetching book');
        }
        setLoading(false);
      })
      .catch(error => {
          console.error('Error fetching book:', error);
          setLoading(false);
      });
    }
  }, [bookId, pageId])

  useEffect(() => {
    if (pageId) {
      console.log("PageId: ", pageId);
      
      if (pageId === 'add-page') {
        setAddPageToggle(true);
        setEditorValue(INITIAL_EDITOR_STATE);
      } else {
        setAddPageToggle(false);
        getPageByPageId(pageId).then(response => {
          if (response.success) {
            console.log(response.data);
            
            setSelectedPage(response.data);
            setEditorValue(response.data.content ? JSON.parse(response.data.content) : INITIAL_EDITOR_STATE);
          } else {
            console.error('Error fetching page');
          }
          setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching page:', error);
            setLoading(false);
        });
      }
    }
  }, [pageId]);

  const handleAddPage = async () => {
    const content = JSON.stringify(editorValue);
    const response = await addPage(bookId, { content, title: newPage.title });

    if (response.success) {
      toast.success(message.page.added.success, {
        autoClose: 2000,
        onClose: () => {
          router.replace(`/book/${bookId}/${response.data.pageId}`);
        }
      });
    } else {
      toast.error(message.page.added.failed);
    }
  }

  const onChange = (value: Descendant[]) => {
    setEditorValue(value)
  }

  const handleBack = () => {
    if (searchParams.get('from') === 'add-book') {
      router.push('/');
    } else {
      router.back();
    }
  }

  const handleImageUpload: MediaCallbackProps = async (file, cb) => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await uploadMedia(formData);
        const url = response.data.url;
        cb(null, url);
      } catch (error) {
        cb(error, null);
      }
    } else {
      cb(new Error("File is null"), null);
    }
  }

  const handleVideoUpload: MediaCallbackProps = async (file, cb) => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await uploadMedia(formData);
        const url = response.data.url;
        cb(null, url);
      } catch (error) {
        cb(error, null);
      }
    } else {
      cb(new Error("File is null"), null);
    }
  }

  if (loading) {
    return <Loader />;
  }

  if (!selectedBook.bookId) return <p>Book not found</p>;

  return (
    <div className={styles.bookPage}>
      <Sidebar book={selectedBook} on={ addPageToggle ? 'add-page' : 'page'} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`${styles.content} ${isSidebarOpen ? styles.contentShift : ''}`}>
        <motion.div transition={{ type: 'spring', damping: 40, mass: 0.75 }}
          initial={{ opacity: 0, x: 1000 }} animate={{ opacity: 1, x: 0 }}>
          <motion.section transition={{ type: 'spring', damping: 44, mass: 0.75 }}
            initial={{ opacity: 0, y: -1000 }} animate={{ opacity: 1, y: 0 }} className={styles.appBar}>
            <div className={styles.leftIcons} onClick={handleBack}>
              <i style={{ fontSize: '20px', cursor: 'pointer' }} className="fas fa-chevron-left"></i>
            </div>
            <div className={styles.title}>
              { addPageToggle ? 
              <input
                placeholder='Enter page title'
                type="text"
                value={newPage.title}
                onChange={(e) => {
                  setNewPage({ ...newPage, title: e.target.value })
                }}
                className={css`
                  font-size: 1.2em;
                  margin: 0;
                  color: #777;
                  text-align: center;
                  border: none;
                  outline: none;
                  background-color: inherit;
                `}
                autoFocus
              /> :
                <h2 className={styles.titleStyles}>{selectedPage.title}</h2>
              }
            </div>
            <div className={styles.icons}>
              <button className={styles.saveButton} onClick={handleAddPage}>Save</button>
              <i style={iconStyle} className="fas fa-cog"></i>
              <i style={iconStyle} className="fas fa-share"></i>
              <i style={iconStyle} className="fas fa-search"></i>
            </div>
          </motion.section>

          <EditorComponent
            toolbarColorPalette={toolbarColorPalette}
            onImageAddition={handleImageUpload}
            onVideoAddition={handleVideoUpload}
            toolbar={Toolbar}
            initialValue={editorValue} 
            onChange={onChange}
          />
          <ToastContainer />
        </motion.div>
      </div>
    </div>
  )
}

const iconStyle = { marginRight: '20px', fontSize: '20px' }

export default BookPage;
