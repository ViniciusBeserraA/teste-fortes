  import React, { useState, useEffect  } from 'react';
  import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip } from '@mui/material';
  import { listar  } from '../../../services/user';
  import styles from './table.module.css';
  import EditIcon from '@mui/icons-material/Edit';
  import DeleteIcon from '@mui/icons-material/Delete';
  import LogoutButton from '../Button/logoutButton';
  import InsertUserButton from '../Button/insertUserButton';
  import FormEditar from '../form/formEditar';
  import ModalConfirm from '../modal/modalConfirm';

  export default function UserTable() {
  
    const [openAlteracao, setOpenAlteracao] = useState(false); 
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [users, setUsers] = useState(listar());
    const [editUserId, setEditUserId] = useState(null); 
    const [userIdToDelete, setUserIdToDelete] = useState(null);
  
    const handleEdit = (id) => {
      setEditUserId(id);
      handleAlteracaoOpen();  
    };

    const handleAlteracaoOpen = () => {
      setOpenAlteracao(true);
    };

    const handleAlteracaoClose = () => {
      setOpenAlteracao(false);
    };

  const handleOpenConfirmationModal = (userId) => {
    setUserIdToDelete(userId);
    setOpenConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setOpenConfirmationModal(false);
  };


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
          <InsertUserButton />
          <LogoutButton />
        </div>

        {openAlteracao && (
        <FormEditar
          editUserId={editUserId}
          open={openAlteracao} onClose={handleAlteracaoClose} 
        />
      )}

      {openConfirmationModal && (
        <ModalConfirm id={userIdToDelete} open={openConfirmationModal} close={handleCloseConfirmationModal} />
        )}

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
