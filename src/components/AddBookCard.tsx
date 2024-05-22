import { motion } from 'framer-motion';

export default function AddBookCard({ onClick }: { onClick: () => void }) {
  return (
    <motion.div 
      style={{
        width: '200px',
        height: '300px',
        padding: '1rem',
        borderRadius: '5px',
        backgroundColor: '#d3e4f8',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        marginBottom: '1.5rem',
        marginRight: '1.6rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }} 
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div style={{ fontSize: '3rem', color: '#000', marginBottom: '0.5rem' }}>+</div>
      <p style={{ fontSize: '1rem', color: '#555' }}>Add Book</p>
    </motion.div>
  );
}
