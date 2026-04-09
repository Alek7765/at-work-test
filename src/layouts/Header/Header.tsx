import styles from './Header.module.scss'
import Logo from "@/components/Logo/Logo"
import Button from "@/components/Button/Button"

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerContent} container`}>
        <Logo />
        <div className={styles.headerPanel}>
          <div className={`${styles.headerActions} hidden-mobile`}>
            <Button
              label="Избранное"
              iconName="Heart"
              isLabelHidden
            />
            <Button
              label="Уведомления"
              iconName="Bell"
              isLabelHidden
            />
          </div>
          <Logo title='Ivan1234'/>
        </div>
      </div>
    </header>
  );
};
