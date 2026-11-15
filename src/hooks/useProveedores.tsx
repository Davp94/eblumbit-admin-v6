import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { proveedoresService } from "../services/proveedores/ProveedoresService";
import type { ProveedorRequest } from "../types/proveedores/ProveedorRequest";

export const useProveedores = () => useQuery({
    queryKey: ["proveedores"],
    queryFn: proveedoresService.getAll,
});

const useInvalidateProveedores = () => {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries({ queryKey: ["proveedores"] });
};

export const useCreateProveedor = () => {
    const invalidate = useInvalidateProveedores();
    return useMutation({
        mutationFn: (proveedor: ProveedorRequest) => proveedoresService.create(proveedor),
        onSuccess: invalidate,
    });
};

export const useUpdateProveedor = () => {
    const invalidate = useInvalidateProveedores();
    return useMutation({
        mutationFn: ({ id, proveedor }: { id: number; proveedor: ProveedorRequest }) =>
            proveedoresService.update(id, proveedor),
        onSuccess: invalidate,
    });
};

export const useDeleteProveedor = () => {
    const invalidate = useInvalidateProveedores();
    return useMutation({
        mutationFn: (id: number) => proveedoresService.remove(id),
        onSuccess: invalidate,
    });
};
