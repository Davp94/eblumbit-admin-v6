import { useMutation } from '@tanstack/react-query';
import { authService, type AuthRequest } from '../services/auth/AuthService';
import { useAuthStore } from '../state-management/authStore';
import { useNavigate } from 'react-router';
export const useAuth = () => {
    const setSession = useAuthStore((state) => state.setSession);
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (authRequest: AuthRequest) => authService.login(authRequest),
        onSuccess: (data) => {
           setSession(data);
           navigate('/dashboard', {replace: true})
        },
        onError: (error) => {
            const axiosError = error as {response?: {data?: unknown}; message: string};
            console.log('LOGIN ERROR RESPONSE', axiosError.response?.data || axiosError.message)
        }
    });
}