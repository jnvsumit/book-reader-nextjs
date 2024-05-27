"use client"
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/Loader/Loader';
import styles from './page.module.css';
import { INITIAL_BOOK_STATE } from '@/constants/initiate.state';
import { IBook } from '@/interfaces/book';
import { getBookByBookId, updateBookByBookId } from '@/apis/book';
import { message } from '@/constants/toast.message';
import Sidebar from '@/components/Sidebar/Sidebar';
import BookCover from '@/components/Book/BookCover';
import ToggleEditModeIcon from '@/components/Icons/ToggleEditModeIcon';
import { uploadMedia } from '@/apis/upload';

const BookPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { bookId } = useParams() as { bookId: string };
  const [selectedBook, setSelectedBook] = useState<IBook>(INITIAL_BOOK_STATE);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  useEffect(() => {
    if (bookId) {
      getBookByBookId(bookId)
        .then(response => {
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
  }, [bookId]);

  const handleBack = () => {
    if (searchParams.get('from') === 'add-book') {
      router.push('/');
    } else {
      router.back();
    }
  };

  const handleTitleEdit = async (newTitle: string) => {
    const updatedBook = await updateBookByBookId(bookId, { title: newTitle });
    if (updatedBook.success) {
      setSelectedBook(prevState => ({ ...prevState, title: updatedBook.data.title }));
      toast.success('Title updated');
    } else {
      toast.error('Title update failed');
    }
  };

  const handleAuthorEdit = async (newAuthor: string) => {
    const updatedBook = await updateBookByBookId(bookId, { author: newAuthor });
    if (updatedBook.success) {
      setSelectedBook(prevState => ({ ...prevState, author: updatedBook.data.author }));
      toast.success('Author updated');
    } else {
      toast.error('Author update failed');
    }
  };

  const handleDescriptionEdit = async (newDescription: string) => {
    const updatedBook = await updateBookByBookId(bookId, { description: newDescription });
    if (updatedBook.success) {
      setSelectedBook(prevState => ({ ...prevState, description: updatedBook.data.description }));
      toast.success('Description updated');
    } else {
      toast.error('Description update failed');
    }
  };

  const handleImageUpdate = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await uploadMedia(formData);
      if (response.success) {
        const url = response.data.url;
        const updatedBook = await updateBookByBookId(bookId, { image: url });
        if (updatedBook.success) {
          setSelectedBook(prevState => ({ ...prevState, image: updatedBook.data.image }));
          toast.success(message.book.cover.success);
        } else {
          toast.error(message.book.cover.failed);
        }
      } else {
        toast.error(message.book.cover.failed);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(message.book.cover.failed);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!selectedBook.bookId) return <p>Book not found</p>;

  return (
    <div className={styles.bookPage}>
      <Sidebar book={selectedBook} on='cover' isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`${styles.content} ${isSidebarOpen ? styles.contentShift : ''}`}>
        <div className={styles.leftIcons} onClick={handleBack}>
          <i style={{ fontSize: '20px', cursor: 'pointer' }} className="fas fa-chevron-left"></i>
        </div>
        <ToggleEditModeIcon isEditMode={isEditMode} onToggle={toggleEditMode} />
        <BookCover
          title={selectedBook.title}
          author={selectedBook.author}
          image={selectedBook.image}
          description={selectedBook.description}
          isEditMode={isEditMode}
          onTitleEdit={handleTitleEdit}
          onAuthorEdit={handleAuthorEdit}
          onDescriptionEdit={handleDescriptionEdit}
          onImageUpload={handleImageUpdate}
        />
        <ToastContainer />
      </div>
    </div>
  );
};

export default BookPage;
