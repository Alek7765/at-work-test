import styles from "./SectionHeader.module.scss";

export default ({title, titleId} : { title: string, titleId: string}) => {
  return (
    <header className={styles.header}>
      <h2
        className={styles.title}
        id={titleId}
      >
        {title}
      </h2>
    </header>
  )
}