
// src/services/auth.js
import { api } from './api';

export async function login({ email, password }) {
    // Primeiro: obter o cookie CSRF
    await api.get('/sanctum/csrf-cookie');

    // Depois: fazer o login
    const response = await api.post('/login', { email, password });

    return response.data; // retorna token, usuário, etc.
}

export async function register({ name, email, password, password_confirmation }) {
    await api.get('/sanctum/csrf-cookie');

    const response = await api.post('/register', {
        name,
        email,
        password,
        password_confirmation,
    });

    return response.data;
}

export async function logout() {
    await api.post('/logout');
}