import { remove } from '../../../services/user';

export default function handler(req,res) {
    try {
        const message = remove(req.body.userIdToDelete);
        res.status(200).json({ message: message });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao remover usuário' }); 
    }
}