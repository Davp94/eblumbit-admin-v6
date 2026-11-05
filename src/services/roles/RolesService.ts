import { apiClient } from "../../config/service.config";
import type { RolesRequest } from "../../types/roles/RolesRequest";
import type { RolesResponse } from "../../types/roles/RolesResponse";

export const rolesService = {
    getAll: async (): Promise<RolesResponse[]> => {
        const { data } = await apiClient.get<RolesResponse[]>("/roles");
        return data;
    },
    getById: async (id: number): Promise<RolesResponse> => {
        const { data } = await apiClient.get<RolesResponse>(`/roles/${id}`);
        return data;
    },
    create: async (role: RolesRequest): Promise<RolesResponse> => {
        const { data } = await apiClient.post<RolesResponse>("/roles", role);
        return data;
    },
    update: async (id: number, role: RolesRequest): Promise<RolesResponse> => {
        const { data } = await apiClient.put<RolesResponse>(`/roles/${id}`, role);
        return data;
    },
    remove: async (id: number): Promise<void> => {
        await apiClient.delete(`/roles/${id}`);
    },
};
