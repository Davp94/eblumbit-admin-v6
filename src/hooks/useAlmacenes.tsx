import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { almacenesService } from "../services/almacenes/AlmacenesService";
import type { AlmacenRequest } from "../types/almacenes/AlmacenRequest";

export const useAlmacenes = () => useQuery({
    queryKey: ["almacenes"],
    queryFn: almacenesService.getAll,
});

const useInvalidateAlmacenes = () => {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries({ queryKey: ["almacenes"] });
};

export const useCreateAlmacen = () => {
    const invalidate = useInvalidateAlmacenes();
    return useMutation({
        mutationFn: (almacen: AlmacenRequest) => almacenesService.create(almacen),
        onSuccess: invalidate,
    });
};

export const useUpdateAlmacen = () => {
    const invalidate = useInvalidateAlmacenes();
    return useMutation({
        mutationFn: ({ id, almacen }: { id: number; almacen: AlmacenRequest }) =>
            almacenesService.update(id, almacen),
        onSuccess: invalidate,
    });
};

export const useDeleteAlmacen = () => {
    const invalidate = useInvalidateAlmacenes();
    return useMutation({
        mutationFn: (id: number) => almacenesService.remove(id),
        onSuccess: invalidate,
    });
};
