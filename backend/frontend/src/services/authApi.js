import { AUTH_URL } from '../config/api';

export const loginUser = async (username, password) => {
    const response = await fetch(`${AUTH_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error('Credenciales inválidas');
    return response.json();
};

export const signupUser = async (userData) => {
    const response = await fetch(`${AUTH_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Error al registrar usuario');
    return response.json();
};
