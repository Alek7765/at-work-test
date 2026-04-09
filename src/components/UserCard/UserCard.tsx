import { useState, useRef, useEffect } from 'react';
import { User } from '@/types/user';
import { MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router';
import styles from './UserCard.module.scss';
import clsx from "clsx";
import avatarImgSrc from '@/assets/images/avatar-s.jpg'

interface UserCardProps {
  user: User;
  isArchived?: boolean;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
  onHide?: (id: number) => void;
}

export default ({ user, isArchived, onArchive, onRestore, onHide }: UserCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEdit = () => {
    setIsMenuOpen(false);
    navigate(`/edit/${user.id}`);
  };

  return (
    <div
      className={clsx(
        styles.card,
        isArchived && styles.isArchived
      )}
    >
      <img
        className={styles.image}
        src={avatarImgSrc}
        alt={user.name}
        width="112"
        height="120"
      />
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.nickname}>{user.username}</h3>
          <div className={styles.menuWrapper} ref={menuRef}>
            <button
              className={styles.menuBtn}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Опции"
            >
              <MoreVertical size={20} />
            </button>

            {isMenuOpen && (
              <div className={styles.dropdown}>
                {!isArchived && (
                  <button onClick={handleEdit} className={styles.menuItem}>
                    <span>Редактировать</span>
                  </button>
                )}

                {isArchived ? (
                  <button
                    onClick={() => { setIsMenuOpen(false); onRestore?.(user.id); }}
                    className={styles.menuItem}
                  >
                    <span>Активировать</span>
                  </button>
                ) : (
                  <button
                    onClick={() => { setIsMenuOpen(false); onArchive?.(user.id); }}
                    className={styles.menuItem}
                  >
                    <span>Архивировать</span>
                  </button>
                )}

                {!isArchived && (
                  <button
                    onClick={() => { setIsMenuOpen(false); onHide?.(user.id); }}
                    className={styles.menuItem}
                  >
                    <span>Скрыть</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <span className={styles.name}>{user.company.name}</span>
        <span className={styles.city}>{user.address.city}</span>
      </div>
    </div>
  );
};
