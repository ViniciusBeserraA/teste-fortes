import { listar } from '../../../services/user';

export default function handler(req,res) {
    try {
        const users = listar(req.body);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao obter usuários' }); 
    }
}