import axios from 'axios';
import { useAuthStore } from '../state-management/authStore';
import type { AuthResponse } from '../services/auth/AuthService';

declare module 'axios' {
    interface InternalAxiosRequestConfig {
        _retry?: boolean;
    }
}

export const apiClient = axios.create({
    baseURL: 'http://localhost:5071/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

const refreshClient = axios.create({
    baseURL: 'http://localhost:5071/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const refreshAuthToken = async (refreshToken: string): Promise<AuthResponse> => {
    const { data } = await refreshClient.post<AuthResponse>('/auth/refresh-token', { refreshToken });
    return data;
}

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
    async (error) => {
        if(!axios.isAxiosError(error)) {
            return Promise.reject(error);
        }
        const request = error.config;
        if(error.response?.status !== 401 || !request || request.url?.includes('/refresh-token')
        || request.url?.includes('/auth/login')) {
            return Promise.reject(error);
        }

        const authStore = useAuthStore.getState();
        if(request._retry || !authStore.refreshToken) {
            authStore.clearSession();
            return Promise.reject(error);
        }

        request._retry = true;
        const currentRefreshPromise = refreshAuthToken(authStore.refreshToken);
        try {
           const refreshedTokens = await currentRefreshPromise; 
           useAuthStore.getState().updateTokens(refreshedTokens);
           return await apiClient(request);
        } catch (error) {
            useAuthStore.getState().clearSession();
            return Promise.reject(error);
        }
    }
)