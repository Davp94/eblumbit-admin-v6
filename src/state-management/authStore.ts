import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    identifier: number | null;
    roles: string[],
    permissions: string[],
    expiration: number | null;
    setSession: (data: any) => void;
    clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            identifier: null,
            roles: [],
            permissions: [],
            expiration: null,
            setSession: (data) => 
                set({
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                    identifier: data.identifier,
                    roles: data.roles,
                    permissions: data.permissions,
                    expiration: data.expiration
                }),
            clearSession: () => 
                set({
                    accessToken: null,
                    refreshToken: null,
                    identifier: null,
                    roles: [],
                    permissions: [],
                    expiration: null,
                }),    
        }),
        {
            name: 'eblumbit-auth',
            storage: createJSONStorage(()=>localStorage),
            partialize: (state) => ({
                 accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                identifier: state.identifier,
                roles: state.roles,
                permissions: state.permissions,
                expiration: state.expiration
            })
        }
    )
);

export const selectIsAuthenticated = (state: AuthState) => Boolean(state.accessToken);