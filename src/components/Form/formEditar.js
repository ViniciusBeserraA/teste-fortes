import React, { useState } from 'react';
import { Button, TextField, Modal, Box, Typography } from '@mui/material';
import styles from '../table/table.module.css';
import useHandles from '../handles/useHandles';
import { listar } from '../../../services/user';

function FormEditar({ id, openAlteracao, handleAlteracaoClose }) {

  const [users, setUsers] = useState(listar());
  const { handleFormUpdateUser, handleGetList } = useHandles();
  const [formData, setFormData] = useState({
    id: id,
    user: '',
    email: '',
    password: ''
  });

  const loadUsers = async () => {
    try {
      const userList = await handleGetList();
      setUsers(userList);
    } catch (error) {
      throw error;
    }
  };

  const handleFormUpdateEdit = (event, name) => {
    setFormData({ ...formData, [name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const success = await handleFormUpdateUser(formData);
      if (success) {
        handleAlteracaoClose(); 
        loadUsers();
        window.location.reload();
      } else {
        console.error('Erro ao editar usuário.');
      }
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
    }
  };

  return (
    <Modal
          open={openAlteracao}
          onClose={handleAlteracaoClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <Typography className={styles.form} id="modal-modal-title" variant="h7" component="h2">
              Editar Usuário
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit}>
              <TextField type="text" label="Usuário" variant="outlined" fullWidth margin="normal" required value={formData.user} onChange={(e) => handleFormUpdateEdit(e, 'user')}/>
              <TextField type="email" label="Email" variant="outlined" fullWidth margin="normal" required value={formData.email} onChange={(e) => handleFormUpdateEdit(e, 'email')}/>
              <TextField type="password" label="Senha" variant="outlined" fullWidth margin="normal" required value={formData.password} onChange={(e) => handleFormUpdateEdit(e, 'password')}/>
                <Button className={styles.buttonForm} type="submit" variant="contained" color="primary">Editar usuário</Button>
              </form>
            </Typography>
          </Box>
        </Modal>
  );
}

export default FormEditar;
