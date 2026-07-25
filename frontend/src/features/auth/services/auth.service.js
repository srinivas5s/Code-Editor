import apiClient from '../../../shared/services/apiClient.js';

export async function registerUser(payload) {
    const response = await apiClient.post('/auth/register', payload);
    return response.data.data.user;
}

export async function loginUser(payload) {
    const response = await apiClient.post('/auth/login', payload);
    return response.data.data.user;
}

export async function logoutUser() {
    await apiClient.post('/auth/logout');
}

export async function getCurrentUser() {
    const response = await apiClient.get('/auth/me');
    return response.data.data.user;
}