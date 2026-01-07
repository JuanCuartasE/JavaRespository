const API_URL = import.meta.env.VITE_AUTH_URL || 'http://localhost:8080/api/auth';

export const loginUser = async (username, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error('Credenciales inválidas');
    return response.json();
};

export const signupUser = async (userData) => {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Error al registrar usuario');
    return response.json();
};
