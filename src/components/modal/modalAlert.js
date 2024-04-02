import React from 'react';
import { Alert } from '@mui/material';
import styles from './modal.module.css'

function modalAlert({ open, onClose }) {
  const handleCloseAlert = () => {
    onClose();
  };

  return (
    <Alert className={styles.modal} severity="error" sx={{ position: 'fixed', bottom: 10, left: '50%', transform: 'translateX(-50%)', width: 'fit-content' }} open={open} onClose={handleCloseAlert}>
      Usuário já cadastrado no sistema.
    </Alert>
  );
}

export default modalAlert;
