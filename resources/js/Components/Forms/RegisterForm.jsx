import { useState } from 'react';
import { api } from '@/services/api';

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        senha_confirmation: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // Primeiro, pegar o CSRF token do Sanctum
            await api.get('/sanctum/csrf-cookie');

            const response = await api.post('/register', formData);
            console.log('Usuário registrado:', response.data);

            // opcional: salvar token, redirecionar etc.
        } catch (error) {
            console.error('Erro ao registrar:', error.response?.data || error);
        }
    };
    return (
        <div className="container mt-5">
            <h2>Registrar Usuário</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Nome</label>
                    <input type="text" className="form-control" name="nome" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label>E-mail</label>
                    <input type="email" className="form-control" name="email" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label>Senha</label>
                    <input type="password" className="form-control" name="senha" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label>Confirmação de Senha</label>
                    <input type="password" className="form-control" name="senha_confirmation" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
        </div>
    );
}
