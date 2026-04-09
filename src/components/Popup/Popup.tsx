import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Popup.module.scss';
import clsx from "clsx";
import Button from "@/components/Button/Button.tsx";
import checkImgSrc from '@/assets/check.svg'

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
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isRendered) return null;

  return createPortal(
    <div className={clsx(styles.overlay, isOpen && styles.isOpen)} onClick={onClose}>
      <div 
        className={`${styles.popup} ${isOpen ? styles.isOpen : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          className={styles.buttonClose}
          label="Закрыть"
          iconName="X"
          isLabelHidden
          extraAttrs={{ onClick: onClose }}
        />
        <div className={styles.content}>
          <img
            className={styles.imageCheck}
            src={checkImgSrc}
            alt=""
            width={60}
            height={60}
          />
          <p className={styles.message}>{message}</p>
        </div>

      </div>
    </div>,
    document.body
  );
};
