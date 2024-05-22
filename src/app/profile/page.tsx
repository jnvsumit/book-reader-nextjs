"use client"
import '@fortawesome/fontawesome-free/css/all.min.css'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from "react"
import styles from './page.module.css'

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula magna at malesuada gravida.",
    avatar: "https://via.placeholder.com/150"
  });

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
          <h2 className={styles.titleStyles}>Profile</h2>
        </div>
      </motion.section>

      <div className={styles.profileContainer}>
        <img src={profile.avatar} alt="Avatar" className={styles.avatar} />
        <div className={styles.profileDetails}>
          <h3 className={styles.name}>{profile.name}</h3>
          <p className={styles.email}>{profile.email}</p>
          <p className={styles.bio}>{profile.bio}</p>
        </div>
      </div>
    </motion.div>
  )
}

const iconStyle = { marginRight: '20px', fontSize: '20px' }
