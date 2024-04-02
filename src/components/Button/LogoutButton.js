import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import styles from '../table/table.module.css';
import LogoutIcon from '@mui/icons-material/Logout';

function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/login');
  };

  return (
    <Button className={styles.button} onClick={handleLogout}>
          <LogoutIcon />
          Sair
      </Button>
  );
}

export default LogoutButton;
