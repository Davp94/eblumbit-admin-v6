import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sucursalesService } from "../services/sucursales/SucursalesService";
import type { SucursalRequest } from "../types/sucursales/SucursalRequest";

export const useSucursales = () => useQuery({
    queryKey: ["sucursales"],
    queryFn: sucursalesService.getAll,
});

const useInvalidateSucursales = () => {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries({ queryKey: ["sucursales"] });
};

export const useCreateSucursal = () => {
    const invalidate = useInvalidateSucursales();
    return useMutation({
        mutationFn: (sucursal: SucursalRequest) => sucursalesService.create(sucursal),
        onSuccess: invalidate,
    });
};

export const useUpdateSucursal = () => {
    const invalidate = useInvalidateSucursales();
    return useMutation({
        mutationFn: ({ id, sucursal }: { id: number; sucursal: SucursalRequest }) =>
            sucursalesService.update(id, sucursal),
        onSuccess: invalidate,
    });
};

export const useDeleteSucursal = () => {
    const invalidate = useInvalidateSucursales();
    return useMutation({
        mutationFn: (id: number) => sucursalesService.remove(id),
        onSuccess: invalidate,
    });
};
