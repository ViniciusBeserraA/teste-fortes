  import React, { useState, useEffect  } from 'react';
  import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Modal, Box, Typography, Tooltip } from '@mui/material';
  import { listar, removeUser  } from '../../../services/user';
  import styles from './table.module.css';
  import AddIcon from '@mui/icons-material/Add';
  import EditIcon from '@mui/icons-material/Edit';
  import DeleteIcon from '@mui/icons-material/Delete';

  export default function UserTable() {
    const [open, setOpen] = useState(false); 
    const [users, setUsers] = useState(listar()); 
    const [formData, setFormData] = useState({
      user: '',
      email: '',
      password: ''
    })

    const handleFormCadastroEdit = (event, name) => { 
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
          handleClose();
        } else {
          console.error('Erro ao cadastrar usuário:', json);
        }
      } catch (error) {
        throw error;
      }
    };

    const handleRemoveUser = async (userId) => {
      try {
        const response = await fetch('../../api/users/remove', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId })
        });
        if (!response.ok) {
          console.log('Erro ao remover usuário');
        }
        const data = await response.json();
        loadUsers();
        return data;
      } catch (error) {
        throw error;
      }
    }

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleEdit = (userId) => {
    
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
        
        <Button className={styles.button} onClick={handleOpen}>
          <AddIcon />
          Inserir Usuário
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Cadastro de Usuário
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form onSubmit={handleFormCadastro}>
              <TextField type="text" label="Usuário" variant="outlined" fullWidth margin="normal" required value={formData.user} onChange={(e) => handleFormCadastroEdit(e, 'user')}/>
              <TextField type="email" label="Email" variant="outlined" fullWidth margin="normal" required value={formData.email} onChange={(e) => handleFormCadastroEdit(e, 'email')}/>
              <TextField type="password" label="Senha" variant="outlined" fullWidth margin="normal" required value={formData.password} onChange={(e) => handleFormCadastroEdit(e, 'password')}/>
                <Button type="submit" variant="contained" color="primary">Cadastrar</Button>
              </form>
            </Typography>
          </Box>
        </Modal>

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
                      <Button onClick={() => handleEdit(user.id)}>
                        <EditIcon sx={{ color: 'orange' }} />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <Button onClick={() => handleRemoveUser(user.id)}>
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
