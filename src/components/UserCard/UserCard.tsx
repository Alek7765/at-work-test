import { useState, useRef, useEffect } from 'react';
import { User } from '../../types/user';
import { MoreVertical, Edit2, Archive, ArchiveRestore, EyeOff, MapPin, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import styles from './UserCard.module.scss';

interface UserCardProps {
  user: User;
  isArchived?: boolean;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
  onHide?: (id: number) => void;
}

export const UserCard = ({ user, isArchived, onArchive, onRestore, onHide }: UserCardProps) => {
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
    <div className={`${styles.card} ${isArchived ? styles.archived : ''}`}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <img src={user.avatar} alt={user.username} />
        </div>
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
                  <Edit2 size={16} />
                  <span>Редактировать</span>
                </button>
              )}
              
              {isArchived ? (
                <button 
                  onClick={() => { setIsMenuOpen(false); onRestore?.(user.id); }} 
                  className={styles.menuItem}
                >
                  <ArchiveRestore size={16} />
                  <span>Активировать</span>
                </button>
              ) : (
                <button 
                  onClick={() => { setIsMenuOpen(false); onArchive?.(user.id); }} 
                  className={styles.menuItem}
                >
                  <Archive size={16} />
                  <span>Архивировать</span>
                </button>
              )}
              
              {!isArchived && (
                <button 
                  onClick={() => { setIsMenuOpen(false); onHide?.(user.id); }} 
                  className={`${styles.menuItem} ${styles.danger}`}
                >
                  <EyeOff size={16} />
                  <span>Скрыть</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.username}>@{user.username}</h3>
        <p className={styles.name}>{user.name}</p>
        
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <MapPin size={16} />
            <span>{user.address.city}</span>
          </div>
          <div className={styles.detailItem}>
            <Building2 size={16} />
            <span>{user.company.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
