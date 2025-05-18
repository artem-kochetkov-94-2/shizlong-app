import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
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
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  rel?: string;
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
  href,
  target,
  rel,
  ...props
}: ButtonProps) => {
  const classes = cn(
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
  );

  if (href) {
    return (
      <a
        className={classes}
        href={disabled ? undefined : href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        aria-disabled={disabled}
        onClick={(e) => disabled && e.preventDefault()}
      >
        {isLoading && <Loader />}
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      {...props}
    >
      {isLoading && <Loader />}
      {children}
    </button>
  );
};
