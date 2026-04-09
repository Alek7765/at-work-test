import { ReactNode } from 'react';
import styles from './Section.module.scss';
import SectionHeader from "@/components/SectionHeader/SectionHeader.tsx";

interface SectionProps {
  title: string
  titleId: string
  children: ReactNode[]
  isEmpty?: boolean
}

export default ({ title, titleId, children, isEmpty = false }: SectionProps) => {
  return (
    <section
      className={`${styles.section} container`}
      aria-labelledby={titleId}
    >
      <SectionHeader title={title} titleId={titleId}/>
      <ul className={styles.list}>
        {isEmpty ? (
          <li><p className={styles.emptyMessage}>Нет активных пользователей</p></li>
        ) : (
          children.map((item, index) => (
            <li key={`card-${index}`}>{item}</li>
          ))
        )}
      </ul>
    </section>
  );
};