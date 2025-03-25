import React from 'react';
import styles from './IconButton.module.css';
import { IconName, IconSize } from '@presentation/ui-kit/Icon/types';
import { Icon } from '@presentation/ui-kit/Icon';
import classNames from 'classnames';
import { IconColor } from '@presentation/ui-kit/Icon/types';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconName?: IconName;
  size?: IconSize;
  iconSize?: IconSize;
  shape?: 'circle' | 'rounded';
  color?: 'gray' | 'white' | 'red' | 'secondary' | 'transparent';
  iconColor?: IconColor;
  withBorder?: boolean;
  withBlur?: boolean;
  withShadow?: boolean;
  disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  shape = 'circle',
  size = 'medium',
  iconSize = 'small',
  color = 'gray',
  children,
  className,
  withBorder = false,
  withBlur = false,
  withShadow = true,
  iconColor,
  disabled,
  ...rest
}) => {
  return (
    <button
      disabled={disabled}
      className={classNames(
        styles.iconButton,
        styles[size],
        styles[shape],
        styles[color],
        className,
        {
          [styles.withBorder]: withBorder,
          [styles.withBlur]: withBlur,
          [styles.withShadow]: withShadow,
        }
      )}
      {...rest}
    >
      {children ? (
        children
      ) : iconName ? (
        <Icon name={iconName} size={iconSize} color={iconColor} />
      ) : null}
    </button>
  );
};
