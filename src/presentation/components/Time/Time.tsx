import styles from "./Time.module.css";

interface TimeProps {
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
}

export const Time = ({ value, onChange, onBlur }: TimeProps) => {
    return (
        <input
            aria-label="Time"
            type="time"
            className={styles.input}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
        />
    );
};
