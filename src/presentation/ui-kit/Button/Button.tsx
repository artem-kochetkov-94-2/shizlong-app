import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';
import cn from 'classnames';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'yellow' | 'gray';
  size?: 'medium' | 'large' | 'small';
  fullWidth?: boolean;
  ghost?: boolean;
  fullRadius?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = true,
  className,
  disabled,
  ghost,
  fullRadius,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        {
          [styles.fullWidth]: fullWidth,
          [styles.disabled]: disabled,
          [styles.ghost]: ghost,
          [styles.fullRadius]: fullRadius,
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}; 