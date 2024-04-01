import { update } from '../../../services/user';

export default function handler(req, res) {
    try {
      const { userId, userData } = req.body;
      if (!userId || !userData) {
        throw new Error('Dados de atualização inválidos.');
      }
      const updatedUsers = update(userId, userData);
      res.status(200).json({ message: 'Usuário atualizado com sucesso', users: updatedUsers });
    } catch (err) {
      console.error('Erro ao atualizar usuário:', err);
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }