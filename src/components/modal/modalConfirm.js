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
            console.log('Usuário editado com sucesso!');
            close(); 
            loadUsers();
            window.location.reload();
          } else {
            console.error('Erro ao remover usuário.');
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
      <DialogTitle id="alert-dialog-title">{"Confirmar Exclusão"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Tem certeza de que deseja excluir este usuário?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default modalConfirm;
