import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, X } from 'lucide-react';
import styles from './Popup.module.scss';

interface PopupProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Popup = ({ message, isOpen, onClose }: PopupProps) => {
  const [isRendered, setIsRendered] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      // Small delay for fade out animation
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isRendered) return null;

  return createPortal(
    <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
      <div 
        className={`${styles.popup} ${isOpen ? styles.open : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.iconWrapper}>
          <CheckCircle2 className={styles.icon} />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>Успешно</h3>
          <p className={styles.message}>{message}</p>
        </div>
        <button onClick={onClose} className={styles.closeBtn} aria-label="Закрыть">
          <X className={styles.closeIcon} />
        </button>
      </div>
    </div>,
    document.body
  );
};
