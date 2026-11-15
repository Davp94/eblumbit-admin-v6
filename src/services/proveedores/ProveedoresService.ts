import { apiClient } from "../../config/service.config";
import type { ProveedorRequest } from "../../types/proveedores/ProveedorRequest";
import type { ProveedorResponse } from "../../types/proveedores/ProveedorResponse";

export const proveedoresService = {
    getAll: async (): Promise<ProveedorResponse[]> => {
        const { data } = await apiClient.get<ProveedorResponse[]>("/proveedores");
        return data;
    },
    create: async (proveedor: ProveedorRequest): Promise<ProveedorResponse> => {
        const { data } = await apiClient.post<ProveedorResponse>("/proveedores", proveedor);
        return data;
    },
    update: async (id: number, proveedor: ProveedorRequest): Promise<ProveedorResponse> => {
        const { data } = await apiClient.put<ProveedorResponse>(`/proveedores/${id}`, proveedor);
        return data;
    },
    remove: async (id: number): Promise<void> => {
        await apiClient.delete(`/proveedores/${id}`);
    },
};
