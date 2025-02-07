import styles from "../styles/Popup.module.css";

const Popup = ({ title, content, onClose }) => {
  return (
    <div className={styles.modal__overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close__btn} onClick={onClose}>&times;</button>
        <h3 className={styles.modal__title}>{title}</h3>
        <p className={styles.modal__content}>{content}</p>
      </div>
    </div>
  );
};

export default Popup;
