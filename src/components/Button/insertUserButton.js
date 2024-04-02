import React, { useState } from 'react';
import { Button } from '@mui/material';
import styles from '../table/table.module.css';
import FormCadastro from '../Form/formCadastro';
import AddIcon from '@mui/icons-material/Add';

function InsertUserButton() {
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <>
      <Button className={styles.button} onClick={handleOpenForm}>
        <AddIcon />
        Inserir Usuário
      </Button>
      <FormCadastro open={openForm} onClose={handleCloseForm} />
    </>
  );
}

export default InsertUserButton;
