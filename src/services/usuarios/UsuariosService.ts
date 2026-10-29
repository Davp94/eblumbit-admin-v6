import { apiClient } from "../../config/service.config";
import type { UsuariosRequest } from "../../types/usuarios/UsuariosRequest";
import type { UsuariosResponse } from "../../types/usuarios/UsuariosResponse";

export const usuarioService = {
    getAll: async (): Promise<UsuariosResponse[]> => {
        const {data} = await apiClient.get<UsuariosResponse[]>('/usuarios');
        return data;
    },
    getById: async (id: number): Promise<UsuariosResponse> => {
        const {data} = await apiClient.get<UsuariosResponse>(`/usuarios/${id}`);
        return data;
    },
    create: async (usuario: UsuariosRequest): Promise<UsuariosResponse> => {
        const {data} = await apiClient.post<UsuariosResponse>('/usuarios', usuario);
        return data;
    },
    update: async (id: number, usuario: UsuariosRequest): Promise<UsuariosResponse> => {
        const {data} = await apiClient.put<UsuariosResponse>(`/usuarios/${id}`, usuario);
        return data;
    },
    remove: async (id: number): Promise<void> => {
        await apiClient.delete(`/usuarios/${id}`);
    },

}