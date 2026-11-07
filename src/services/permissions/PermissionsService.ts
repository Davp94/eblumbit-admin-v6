import { apiClient } from "../../config/service.config";
import type { PermissionRequest } from "../../types/permissions/PermissionRequest";
import type { PermissionResponse } from "../../types/permissions/PermissionResponse";

export const permissionService = {
    getAll: async (): Promise<PermissionResponse[]> => {
        const { data } = await apiClient.get<PermissionResponse[]>("/permissions");
        return data;
    },
    getById: async (id: number): Promise<PermissionResponse> => {
        const { data } = await apiClient.get<PermissionResponse>(`/permissions/${id}`);
        return data;
    },
    create: async (permission: PermissionRequest): Promise<PermissionResponse> => {
        const { data } = await apiClient.post<PermissionResponse>("/permissions", permission);
        return data;
    },
    update: async (id: number, permission: PermissionRequest): Promise<PermissionResponse> => {
        const { data } = await apiClient.put<PermissionResponse>(`/permissions/${id}`, permission);
        return data;
    },
    remove: async (id: number): Promise<void> => {
        await apiClient.delete(`/permissions/${id}`);
    },
};
