import React from 'react';
import { Rings } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <Rings
        height="80"
        width="80"
        color="#4fa94d"
        radius="6"
        wrapperStyle={{}}
        wrapperClass={styles.loader}
        visible={true}
        ariaLabel="rings-loading"
      />
    </div>
  );
};

export default Loader;
