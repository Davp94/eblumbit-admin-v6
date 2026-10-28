import { apiClient } from "../../config/service.config";
import type { UsuariosResponse } from "../../types/usuarios/UsuariosResponse";

export const usuarioService = {
    getAll: async (): Promise<UsuariosResponse[]> => {
        const {data} = await apiClient.get<UsuariosResponse[]>('/usuarios');
        return data;
    }

}