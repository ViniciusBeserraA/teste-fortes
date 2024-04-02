  import React, { useState, useEffect  } from 'react';
  import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Modal, Box, Typography, Tooltip } from '@mui/material';
  import { listar  } from '../../../services/user';
  import styles from './table.module.css';
  import AddIcon from '@mui/icons-material/Add';
  import EditIcon from '@mui/icons-material/Edit';
  import DeleteIcon from '@mui/icons-material/Delete';
  import LogoutButton from '../Button/LogoutButton';

  export default function UserTable() {
   
    const [openCadastro, setOpenCadastro] = useState(false); 
    const [openAlteracao, setOpenAlteracao] = useState(false); 
    const [users, setUsers] = useState(listar());
    const [editUserId, setEditUserId] = useState(null); 
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [formData, setFormData] = useState({
      user: '',
      email: '',
      password: ''
    })
  
    const handleEdit = (user) => {
      setEditUserId(user.id);
      handleAlteracaoOpen();  
    };

  const handleOpenConfirmationModal = (userId) => {
    setUserIdToDelete(userId);
    setOpenConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setOpenConfirmationModal(false);
  };

    const handleFormCadastroEdit = (event, name) => { 
      setFormData({...formData, [name]: event.target.value})
    }
    const handleFormUpdateEdit = (event, name) => { 
      setFormData({...formData, [name]: event.target.value})
    }
   
    const handleGetList = async() => {
      try {
        const response = await fetch('../../api/users/users',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Erro ao obter usuários');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
    }
    
    const handleFormCadastro = async (event) => {
      try {
        event.preventDefault();
    
        if (!formData.user || !formData.email || !formData.password) {
          return;
        }
    
        const response = await fetch('../../api/users/cadastro', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const json = await response.json();
    
        if (response.ok) {
          const newUser = {
            id: users.length + 1,
            user: formData.user,
            email: formData.email,
            password: formData.password
          };
          setUsers([...users, newUser]);
          handleCadastroClose();
        } else {
          console.error('Erro ao cadastrar usuário:', json);
        }
      } catch (error) {
        throw error;
      }
    };


    const handleFormUpdateUser = async (event) => {
      try {
        event.preventDefault();
        if (!formData.user || !formData.email || !formData.password) {
          console.error('Por favor, preencha todos os campos obrigatórios.');
          return;
        }
    
        const response = await fetch('../../api/users/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              id: editUserId,
              user: formData.user,
              email: formData.email,
              password: formData.password
          })
        });
    
        if (response.ok) {
          const updatedUser = {
            id: editUserId,
            user: formData.user,
            email: formData.email,
            password: formData.password
          };
          setUsers(users.map(user => (user.id === editUserId ? updatedUser : user)));
          handleAlteracaoClose();
        } else {
          console.error('Erro ao atualizar usuário:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
      }
    };

    const handleRemoveUser = async () => {
      try {
        const response = await fetch('../../api/users/remove', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userIdToDelete })
        });
        if (!response.ok) {
          console.log('Erro ao remover usuário');
        }
        const data = await response.json();
        loadUsers();
        handleCloseConfirmationModal();
        return data;
      } catch (error) {
        throw error;
      }
    }

    const handleCadastroOpen = () => {
      setOpenCadastro(true);
    };

    const handleCadastroClose = () => {
      setOpenCadastro(false);
    };

    const handleAlteracaoOpen = () => {
      setOpenAlteracao(true);
    };

    const handleAlteracaoClose = () => {
      setOpenAlteracao(false);
    };

    const loadUsers = async () => {
      try {
        const userList = await handleGetList();
        setUsers(userList);
      } catch (error) {
        throw error;
      }
    };

    useEffect(() => {
      loadUsers();
    }, []);

    
    return (
      <div className={styles.table}>
        <h1>Listagem de Usuários</h1>
        
        <div className={styles.buttonsContainer}>
          <Button className={styles.button} onClick={handleCadastroOpen}>
            <AddIcon />
            Inserir Usuário
          </Button>
          <LogoutButton />
        </div>

        <Modal
          open={openCadastro}
          onClose={handleCadastroClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <Typography className={styles.form} id="modal-modal-title" variant="h7" component="h2">
              Cadastar Usuário
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form onSubmit={handleFormCadastro}>
              <TextField type="text" label="Usuário" variant="outlined" fullWidth margin="normal" required value={formData.user} onChange={(e) => handleFormCadastroEdit(e, 'user')}/>
              <TextField type="email" label="Email" variant="outlined" fullWidth margin="normal" required value={formData.email} onChange={(e) => handleFormCadastroEdit(e, 'email')}/>
              <TextField type="password" label="Senha" variant="outlined" fullWidth margin="normal" required value={formData.password} onChange={(e) => handleFormCadastroEdit(e, 'password')}/>
                <Button className={styles.buttonForm} type="submit" variant="contained" color="primary">Cadastrar</Button>
              </form>
            </Typography>
          </Box>
        </Modal>

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
              <form onSubmit={handleFormUpdateUser}>
              <TextField type="text" label="Usuário" variant="outlined" fullWidth margin="normal" required value={formData.user} onChange={(e) => handleFormUpdateEdit(e, 'user')}/>
              <TextField type="email" label="Email" variant="outlined" fullWidth margin="normal" required value={formData.email} onChange={(e) => handleFormUpdateEdit(e, 'email')}/>
              <TextField type="password" label="Senha" variant="outlined" fullWidth margin="normal" required value={formData.password} onChange={(e) => handleFormUpdateEdit(e, 'password')}/>
                <Button className={styles.buttonForm} type="submit" variant="contained" color="primary">Editar usuário</Button>
              </form>
            </Typography>
          </Box>
        </Modal>


        <Dialog
        open={openConfirmationModal}
        onClose={handleCloseConfirmationModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar Exclusão"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza de que deseja excluir este usuário?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleRemoveUser} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

        <TableContainer component={Paper} style={{ width: '80%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Usuário</TableCell>
                <TableCell>Senha</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.user}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.user}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>
                    <Tooltip title="Editar">
                      <Button onClick={() => handleEdit(user)}>
                        <EditIcon sx={{ color: 'orange' }} />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Excluir"> 
                      <Button onClick={() => handleOpenConfirmationModal(user.id)}>
                        <DeleteIcon sx={{ color: 'red' }} />
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
