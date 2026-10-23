import { apiClient } from "../../config/service.config";

export interface AuthRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    expiration: number;
    roles: string[];
    identifier: number;
    permissions: string[];
}

export const authService = {
    login: async (authRequest: AuthRequest): Promise<AuthResponse> => {
        const { data } = await apiClient.post<AuthResponse>('/auth/login', authRequest);
        return data;
    },
    refreshToken: async() => {}
}