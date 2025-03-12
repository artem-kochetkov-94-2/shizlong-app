import styles from "./Time.module.css";

export const Time = () => {
    return (
        <input aria-label="Time" type="time" className={styles.input} />
    );
};
