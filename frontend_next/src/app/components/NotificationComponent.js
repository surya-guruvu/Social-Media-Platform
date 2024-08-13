// components/Notification.js
import React from 'react';
import styles from './Notification.module.css';

const Notification = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className={styles.notification}>
      <p>{message}</p>
      <button onClick={onClose} className={styles.closeButton}>×</button>
    </div>
  );
};

export default Notification;
