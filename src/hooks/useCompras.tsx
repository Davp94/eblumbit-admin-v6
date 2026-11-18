import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { CompraRequest } from "../types/compras/ComprasRequest";
import { comprasService } from "../services/compras/ComprasService";

export const useCompras = () => useQuery({
    queryKey: ["compras"],
    queryFn: comprasService.getAll,
});

export const useCompraById = (id: number | null) => useQuery({
    queryKey: ["compras", "detail", id],
    queryFn: () => {
        if (id === null) {
            throw new Error("Se requiere el identificador de la compra");
        }
        return comprasService.getById(id);
    },
    enabled: id !== null,
});

export const useCreateCompra = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (compra: CompraRequest) => comprasService.create(compra),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({queryKey: ['compras']}),
                queryClient.invalidateQueries({queryKey: ['productos']})
            ])
        }
    });
}

export const useAnularCompra = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => comprasService.anular(id),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["compras"] }),
                queryClient.invalidateQueries({ queryKey: ["productos"] }),
            ]);
        },
    });
};