import styles from './DecorateButton.module.css';
import classnames from 'classnames';

interface DecorateButtonProps {
    text: string;
    color?: 'blue';
}

export const DecorateButton = ({ text, color }: DecorateButtonProps) => {
    return (
        <div className={classnames(styles.badge, color && styles[color])}>{text}</div>
    );
};
