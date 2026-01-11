const getBaseUrl = () => {
    // If we are in production (Render), use the production backend URL
    // If not, use the environment variable or default to localhost
    if (import.meta.env.PROD) {
        return 'https://javarespository.onrender.com';
    }
    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
};

export const API_BASE_URL = getBaseUrl();
export const AUTH_URL = `${API_BASE_URL}/api/auth`;
export const REQUESTS_URL = `${API_BASE_URL}/api/requests`;
