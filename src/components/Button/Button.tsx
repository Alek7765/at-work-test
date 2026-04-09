import styles from './Button.module.scss'
import clsx from "clsx"
import * as Icons from 'lucide-react'

interface ButtonProps {
  className?: string
  type?: 'button' | 'submit' | 'reset'
  href?: string
  target?: string
  mode?: '' | 'transparent' | 'black-10' | 'black-08' | 'black-06'
  label?: string
  isLabelHidden?: boolean
  iconName?: string  // ← меняем на string
  extraAttrs?: React.HTMLAttributes<HTMLElement>
}

export default (props: ButtonProps) => {
  const {
    className,
    type = 'button',
    href,
    target,
    label,
    isLabelHidden = false,
    iconName,
    extraAttrs,
  } = props

  const isLink = href !== undefined
  const Component = isLink ? 'a' : 'button'
  const linkProps = { href, target }
  const buttonProps = { type }
  const specificProps = isLink ? linkProps : buttonProps
  const title = isLabelHidden ? label : undefined

  const Icon = iconName ? (Icons as any)[iconName] : null

  return (
    <Component
      className={clsx(
        className,
        styles.button
      )}
      title={title}
      aria-label={title}
      {...specificProps}
      {...extraAttrs}
    >
      {Icon && <Icon size={20} />}
      {!isLabelHidden && (
        <span className={styles.label}>{label}</span>
      )}
    </Component>
  )
}