import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'link' | 'info' | 'success' | 'warning' | 'error'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  outline?: boolean
  loading?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  ghost: 'btn-ghost',
  link: 'btn-link',
  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
}

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  outline = false,
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'btn',
        variantClasses[variant],
        sizeClasses[size],
        outline && 'btn-outline',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="loading loading-spinner" />}
      {children}
    </button>
  )
}
