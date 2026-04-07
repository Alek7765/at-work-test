import styles from './Header.module.scss';
import { LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.wrapper}>
          <Link to="/" className={styles.logo}>
            <LayoutDashboard className={styles.icon} />
            <span>At-Work</span>
          </Link>
          <div className={styles.user}>
            <div className={styles.avatar}>
              <img src="https://ui-avatars.com/api/?name=Admin&background=4F46E5&color=fff" alt="Admin" />
            </div>
            <span className={styles.username}>Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};
