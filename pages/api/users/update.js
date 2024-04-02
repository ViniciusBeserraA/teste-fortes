import { update } from '../../../services/user';

export default function handler(req, res) {
  try {
    const { editUserId, user, email, password } = req.body;
    const updatedUsers = update({ id: editUserId, user, email, password });
    res.status(200).json({ message: 'Usuário atualizado com sucesso', users: updatedUsers });
  } catch (err) {
    console.error('Erro ao atualizar usuário', err);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
}