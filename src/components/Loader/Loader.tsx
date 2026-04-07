import styles from './Loader.module.scss';
import { Loader2 } from 'lucide-react';

export const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <Loader2 className={styles.spinner} />
      <span className={styles.text}>Загрузка данных...</span>
    </div>
  );
};
