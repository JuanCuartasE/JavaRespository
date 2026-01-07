const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/requests';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
};

export const getSortedRequests = async () => {
    const response = await fetch(API_URL, {
        headers: getHeaders(),
    });
    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.reload();
    }
    if (!response.ok) throw new Error('Error fetching requests');
    return response.json();
};

export const createRequest = async (requestData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(requestData),
    });
    if (!response.ok) throw new Error('Error creating request');
    return response.json();
};
