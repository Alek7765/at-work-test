import styles from './Logo.module.scss'
import clsx from 'clsx'
import { Link } from "react-router"
import logoImgSrc from '/logo.svg'
import avatarImgSrc from '@/assets/images/avatar-xs.jpg'


export default ({ title }: { title?: string }) => {
  const defaultTitle = title ? title : 'at-work'
  const imgSrs = title ? avatarImgSrc : logoImgSrc
  const imageSize = title ? 20 : 24

  return (
    <Link
      to="/"
      className={styles.logo}
      title={defaultTitle}
      aria-label={defaultTitle}
    >
      <img
        className={styles.logoImage}
        src={imgSrs}
        alt=""
        width={imageSize}
        height={imageSize}
        loading="eager"
      />
      <span
        className={clsx(styles.logoTitle,
          title && `${styles.logoTitleSmall} hidden-mobile`
        )}
      >
        {!title ? (
          <>at-<strong>work</strong></>
        ) : (
          title
        )}
      </span>
    </Link>
  )
}