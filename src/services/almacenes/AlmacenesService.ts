import { apiClient } from "../../config/service.config";
import type { AlmacenRequest } from "../../types/almacenes/AlmacenRequest";
import type { AlmacenResponse } from "../../types/almacenes/AlmacenResponse";

export const almacenesService = {
    getAll: async (): Promise<AlmacenResponse[]> => {
        const { data } = await apiClient.get<AlmacenResponse[]>("/almacenes");
        return data;
    },
    getAlmacenesBySucursal: async (sucursalId: number): Promise<AlmacenResponse[]> => {
        const { data } = await apiClient.get<AlmacenResponse[]>(`/almacenes/${sucursalId}/sucursal`);
        return data;
    },
    create: async (almacen: AlmacenRequest): Promise<AlmacenResponse> => {
        const { data } = await apiClient.post<AlmacenResponse>("/almacenes", almacen);
        return data;
    },
    update: async (id: number, almacen: AlmacenRequest): Promise<AlmacenResponse> => {
        const { data } = await apiClient.put<AlmacenResponse>(`/almacenes/${id}`, almacen);
        return data;
    },
    remove: async (id: number): Promise<void> => {
        await apiClient.delete(`/almacenes/${id}`);
    },
};
