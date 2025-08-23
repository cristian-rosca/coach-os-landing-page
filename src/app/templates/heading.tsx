import clsx from 'clsx'

type HeadingProps = { level?: 1 | 2 | 3 | 4 | 5 | 6 } & React.ComponentPropsWithoutRef<
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>

const getHeadingStyles = (level: number) => {
  const baseStyles = 'font-display font-semibold text-foreground'
  
  switch (level) {
    case 1:
      return clsx(baseStyles, 'text-4xl sm:text-6xl leading-tight')
    case 2:
      return clsx(baseStyles, 'text-2xl sm:text-3xl')
    case 3:
      return clsx(baseStyles, 'text-xl sm:text-2xl')
    case 4:
      return clsx(baseStyles, 'text-lg sm:text-xl')
    case 5:
      return clsx(baseStyles, 'text-base sm:text-lg')
    case 6:
      return clsx(baseStyles, 'text-sm sm:text-base')
    default:
      return clsx(baseStyles, 'text-4xl sm:text-6xl leading-tight')
  }
}

export function Heading({ className, level = 1, ...props }: HeadingProps) {
  const Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={clsx(getHeadingStyles(level), className)}
    />
  )
}

export function Subheading({ className, level = 2, ...props }: HeadingProps) {
  const Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={clsx(getHeadingStyles(level), className)}
    />
  )
}
