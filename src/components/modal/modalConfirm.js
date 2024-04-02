import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import useHandles from '../handles/useHandles';

function modalConfirm({ id, open, close}) {
const { handleRemoveUser, handleGetList } = useHandles();

const loadUsers = async () => {
    try {
        const userList = await handleGetList();
        setUsers(userList);
        } catch (error) {
            throw error;
        }
    };

    const handleConfirm = async () => {
        try {
          const success = await handleRemoveUser(id);
          if (success) {
            close(); 
            loadUsers();
            window.location.reload();
          }
        } catch (error) {
          console.error('Erro ao remover usuário:', error);
        }
      };

  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: '#f44336', color: 'white' }}>
        {"Confirmar Exclusão"}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: '#f44336', color: 'white' }}>
        <DialogContentText id="alert-dialog-description" sx={{ backgroundColor: '#f44336', color: 'white' }}>
          Tem certeza de que deseja excluir este usuário?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: '#f44336', color: 'white' }}>
        <Button onClick={close} sx={{ color: 'white' }}>
          Cancelar
        </Button>
        <Button onClick={handleConfirm} autoFocus sx={{ color: 'white' }}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default modalConfirm;
