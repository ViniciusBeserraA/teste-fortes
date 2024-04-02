import { update } from '../../../services/user';

export default function handler(req, res) {
  try {
    console.log('body para edicao', req.body)
    const updatedUser = update(req.body);
    res.status(200).json({ message: 'Usuário atualizado com sucesso', user: updatedUser });
  } catch (err) {
    console.error('Erro ao atualizar usuário', err);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
}