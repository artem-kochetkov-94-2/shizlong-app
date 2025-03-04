import { HTMLAttributes, useState } from 'react';
import styles from './CopyableDiv.module.css';
import cn from 'classnames';
import { Icon } from '../Icon';

export interface CopyableDivProps extends HTMLAttributes<HTMLDivElement>  {
  children: number | string;
  size?: 'medium' | 'large' | 'small';
  fullWidth?: boolean;
}

export const CopyableDiv = ({
  children,
  size = 'medium',
  fullWidth = true,
  className,
  ...props
}: CopyableDivProps) => {
    const [copied, setCopied] = useState(false);
    
   const handleCopy = () => {
    const textToCopy = children?.toString() || "";

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 7000);
    });
  };
  return (
    <div
      onClick={handleCopy}
      className={cn(
        styles.div,
        styles[size],
        {
          [styles.fullWidth]: fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
      <Icon name={copied ? 'check4' : 'copy'} size={'small'}></Icon>
    </div>
  );
}; 