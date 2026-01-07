import { REQUESTS_URL } from '../config/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
};

export const getSortedRequests = async () => {
    const response = await fetch(REQUESTS_URL, {
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
    const response = await fetch(REQUESTS_URL, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(requestData),
    });
    if (!response.ok) throw new Error('Error creating request');
    return response.json();
};
