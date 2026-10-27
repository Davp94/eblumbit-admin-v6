import axios from 'axios';
import { useAuthStore } from '../state-management/authStore';

export const apiClient = axios.create({
    baseURL: 'http://localhost:5070/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().accessToken;
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response.status === 401 && useAuthStore.getState().accessToken) {
            useAuthStore.getState().clearSession();
        }
        return Promise.reject(error);
    }
)