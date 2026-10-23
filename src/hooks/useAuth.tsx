import { useMutation } from '@tanstack/react-query';
import { authService, type AuthRequest } from '../services/auth/AuthService';
export const useAuth = () => {
    return useMutation({
        mutationFn: (authRequest: AuthRequest) => authService.login(authRequest),
        onSuccess: (data) => {
            localStorage.setItem('auth_token', data.accessToken);
            localStorage.setItem('refresh_token', data.refreshToken);
            localStorage.setItem('identifier', data.identifier+'');
            localStorage.setItem('roles', data.roles.toString());
            localStorage.setItem('permissions', data.permissions.toString());
        },
        onError: (error: any) => {
            console.log('LOGIN ERROR RESPONSE', error.response.data || error.message)
        }
    });
}