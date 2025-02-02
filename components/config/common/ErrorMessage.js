import styles from '../../../styles/Config.module.scss';
export const ErrorMessage = ({ message }) => {
 if (!message) return null;
 return <p className={styles.errorMessage}>{message}</p>;
};