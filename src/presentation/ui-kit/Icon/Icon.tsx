import { icons } from "./const";
import { IconColor, IconName, IconSize } from "./types";
import styles from './Icon.module.css';
import classNames from 'classnames';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
}

export function Icon({ name, size = 'medium', className, color, ...restProps }: IconProps) {
  const SvgIcon = icons[name];

  if (!SvgIcon) {
    return null;
  }

  return (
    <SvgIcon
      className={classNames(
        styles[size],
        styles[color as IconColor],
        className
      )}
      {...restProps}
    />
  );
}

