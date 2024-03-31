import React, { useState, useEffect } from 'react';
import UserTable from '../src/components/table/table';
import styles from "../styles/Index.module.css";
import { getCookie } from 'cookies-next';
import { verifyToken } from '../services/user';
import { Alert, Slide } from '@mui/material';


export const getServerSideProps = async ({ req, res }) => {
  try {
    const token = getCookie('authorization', { req, res });
    if (!token) throw new Error('invalid token');
    verifyToken(token);
    return { props: {} };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }
};

export default function Home() {
  const [open, setOpen] = useState(true);
  const checkAuthentication = async () => {
    try {
      const token = getCookie('authorization');
      verifyToken(token);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    checkAuthentication();
    const timer = setTimeout(() => {
      setOpen(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.background}>
      <UserTable/>
    <Slide direction="down" in={open} mountOnEnter unmountOnExit>
      <Alert className={styles.modalContainer} severity="success" onClose={handleClose}>
        Login realizado com sucesso!
      </Alert>
    </Slide>
    </div>
    
  );
}
