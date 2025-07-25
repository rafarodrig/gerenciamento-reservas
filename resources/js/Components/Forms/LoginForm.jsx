// resources/js/Pages/Auth/Login.jsx

import { useState } from 'react';
import { api } from '@/services/api';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        senha: '',
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await api.post('http://localhost:8000/api/login', formData, {
                withCredentials: true,
            });

            const token = response.data.token;

            // Salvar o token (opcional, se você estiver usando JWT e não cookies)
            localStorage.setItem('token', token);

            // Redirecionar após login
            window.location.href = '/consultar-reservas';
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao fazer login.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Senha:</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Entrar</button>
            </form>
        </div>
    );
}
