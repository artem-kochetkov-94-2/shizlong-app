import { icons } from "./const";
import { IconName, IconSize } from "./types";
import styles from './Icon.module.css';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: IconSize;
}

export function Icon({ name, size = 'medium', className, ...restProps }: IconProps) {
  const SvgIcon = icons[name];

  if (!SvgIcon) {
    return null;
  }

  return <SvgIcon {...restProps} className={`${styles[size]} ${className}`} />;
}

