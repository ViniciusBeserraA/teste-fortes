import { useState, useEffect } from 'react';

const useHandles = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const handleGetList = async () => {
    try {
      const response = await fetch('../../api/users/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Erro ao obter usuários');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      throw error;
    }
  };

  const handleFormCadastro = async (formData) => {
    try {
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
        return true;
      } else {
        console.error('Erro ao cadastrar usuário:', json);
        return false;
      }
    } catch (error) {
      throw error;
    }
  };


  const handleFormUpdateUser = async (formData) => {
    try {
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
            id: formData.id,
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
        return true;
      } else {
        console.error('Erro ao atualizar usuário:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };


  const handleRemoveUser = async (userIdToDelete) => {
    try {
      const response = await fetch('../../api/users/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: userIdToDelete })
      });
      if (!response.ok) {
        console.log('Erro ao remover usuário');
        return false;
      }
      setUsers(users.filter(user => user.id !== userIdToDelete));
      return true;
    } catch (error) {
      throw error;
    }
  };  

  return {
    users,
    editUserId,
    userIdToDelete,
    handleGetList,
    handleFormCadastro,
    handleFormUpdateUser,
    handleRemoveUser
  };
};

export default useHandles;
