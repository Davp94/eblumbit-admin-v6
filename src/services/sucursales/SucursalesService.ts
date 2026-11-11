import { apiClient } from "../../config/service.config";
import type { SucursalRequest } from "../../types/sucursales/SucursalRequest";
import type { SucursalResponse } from "../../types/sucursales/SucursalResponse";

export const sucursalesService = {
    getAll: async (): Promise<SucursalResponse[]> => {
        const { data } = await apiClient.get<SucursalResponse[]>("/sucursales");
        return data;
    },
    create: async (sucursal: SucursalRequest): Promise<SucursalResponse> => {
        const { data } = await apiClient.post<SucursalResponse>("/sucursales", sucursal);
        return data;
    },
    update: async (id: number, sucursal: SucursalRequest): Promise<SucursalResponse> => {
        const { data } = await apiClient.put<SucursalResponse>(`/sucursales/${id}`, sucursal);
        return data;
    },
    remove: async (id: number): Promise<void> => {
        await apiClient.delete(`/sucursales/${id}`);
    },
};
