import React, { useState } from 'react';
import { Button, TextField, Modal, Box, Typography } from '@mui/material';
import styles from '../table/table.module.css';
import useHandles from '../handles/useHandles';
import { listar } from '../../../services/user';
import ModalAlert from '../modal/modalAlert'; 

function FormCadastro({ open, onClose }) {
 
  const [users, setUsers] = useState(listar());
  const { handleFormCadastro, handleGetList } = useHandles();
  const [formData, setFormData] = useState({
    user: '',
    email: '',
    password: ''
  });

  const [alertOpen, setAlertOpen] = useState(false);

  const loadUsers = async () => {
    try {
      const userList = await handleGetList();
      setUsers(userList);
    } catch (error) {
      throw error;
    }
  };

  const handleFormCadastroEdit = (event, name) => {
    setFormData({ ...formData, [name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userExists = users.some(user => user.email === formData.email);
      if (userExists) {
        console.log('chegou aqui------------------->')
        setAlertOpen(true);
        return false;
      }
      
      const success = await handleFormCadastro(formData);
      if (success) {
        console.log('Usuário inserido com sucesso!');
        onClose(); 
        loadUsers();
        window.location.reload();
      } else {
        console.error('Erro ao inserir usuário.');
      }
    } catch (error) {
      console.error('Erro ao inserir usuário:', error);
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <div>
      {alertOpen && (<ModalAlert open={alertOpen} onClose={handleCloseAlert} /> )}
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography className={styles.form} id="modal-modal-title" variant="h7" component="h2">
            Cadastar Usuário
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit}>
              <TextField type="text" label="Usuário" variant="outlined" fullWidth margin="normal" required value={formData.user} onChange={(e) => handleFormCadastroEdit(e, 'user')} />
              <TextField type="email" label="Email" variant="outlined" fullWidth margin="normal" required value={formData.email} onChange={(e) => handleFormCadastroEdit(e, 'email')} />
              <TextField type="password" label="Senha" variant="outlined" fullWidth margin="normal" required value={formData.password} onChange={(e) => handleFormCadastroEdit(e, 'password')} />
              <Button className={styles.buttonForm} type="submit" variant="contained" color="primary">Cadastrar</Button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default FormCadastro;
