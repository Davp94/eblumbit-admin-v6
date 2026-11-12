import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ProductoQueryParams } from "../types/productos/ProductoQueryParams";
import { productoService } from "../services/productos/ProductoService";
import type { ProductoRequest } from "../types/productos/ProductoRequest";

export const useProductos = (queryParams: ProductoQueryParams) => {
    return useQuery({
        queryKey: ['productos', queryParams],
        queryFn: () => productoService.getPoductosPaginacion(queryParams),
        enabled: queryParams.almacenId !== undefined && queryParams.almacenId > 0
    })
}

const useInvalidateProductos = () => {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries({queryKey: ['productos']});
}

export const useBuscarProducto = (search: string) => {
    const queryParams: ProductoQueryParams = {pageNumber: 1, pageSize: 20, search}
    return useQuery({
        queryKey: ['productos', queryParams],
        queryFn: () => productoService.getPoductosPaginacion(queryParams),
        enabled: search.trim().length >= 2
    })
}

export const useCreateProducto = () => {
    const invalidateProductos = useInvalidateProductos();
    return useMutation({
        mutationFn: (producto: ProductoRequest) => productoService.createProducto(producto),
        onSuccess: invalidateProductos
    })
}

export const useAddProductoAlmacen = () => {
    const invalidateProductos = useInvalidateProductos();
    return useMutation({
        mutationFn: ({productoId, almacenId}: {productoId: number, almacenId: number}) => productoService.createProductoAlmacen(almacenId, productoId),
        onSuccess: invalidateProductos
    })
}