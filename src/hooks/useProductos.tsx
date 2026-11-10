import { useQuery } from "@tanstack/react-query";
import type { ProductoQueryParams } from "../types/productos/ProductoQueryParams";
import { productoService } from "../services/productos/ProductoService";

export const useProductos = (queryParams: ProductoQueryParams) => {
    return useQuery({
        queryKey: ['productos', queryParams],
        queryFn: () => productoService.getPoductosPaginacion(queryParams)
    })
}