import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';
import cn from 'classnames';
import { Loader } from '../Loader';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'yellow' | 'gray' | 'gray2';
  size?: 'medium' | 'large' | 'small';
  fullWidth?: boolean;
  ghost?: boolean;
  fullRadius?: boolean;
  withShadow?: boolean;
  isLoading?: boolean;
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
  withShadow,
  isLoading,
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
          [styles.withShadow]: withShadow,
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {isLoading && <Loader />}
      {children}
    </button>
  );
};
