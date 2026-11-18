import { apiClient } from "../../config/service.config";
import type { CompraRequest } from "../../types/compras/ComprasRequest";
import type { ComprasResponse } from "../../types/compras/ComprasResponse";

export const comprasService = {
    getAll: async (): Promise<ComprasResponse[]> => {
        const { data } = await apiClient.get<ComprasResponse[]>('/compras');
        return data;
    },
    getById: async (id: number): Promise<ComprasResponse> => {
        const { data } = await apiClient.get<ComprasResponse>(`/compras/${id}`);
        return data;
    },
    create: async (compra: CompraRequest): Promise<ComprasResponse> => {
        const { data } = await apiClient.post<ComprasResponse>('/compras', compra);
        return data;
    },
    anular: async (id: number): Promise<void> => {
        await apiClient.patch(`/compras/${id}`, null);
    },
    generateReport: async (id: number): Promise<Blob> => {
        const { data } = await apiClient.get<Blob>(`/compras/${id}/report`, {
            responseType: 'blob'
        });
        return data;
    }
}