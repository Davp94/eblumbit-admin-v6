import type { PageResult } from "../../common/types/PageResult";
import { apiClient } from "../../config/service.config";
import type { ProductoQueryParams } from "../../types/productos/ProductoQueryParams";
import type { ProductoRequest } from "../../types/productos/ProductoRequest";
import type { ProductoResponse } from "../../types/productos/ProductoResponse";

export const productoService = {
    getPoductosPaginacion: async (queryParams: ProductoQueryParams): Promise<PageResult<ProductoResponse>> => {
        const { data } = await apiClient.get<PageResult<ProductoResponse>>("/productos", {
            params: queryParams
        });
        return data;
    },

    createProducto: async (request: ProductoRequest): Promise<ProductoResponse>  => {
        const formData = new FormData();
        formData.append("nombre", request.nombre);
        formData.append("codigoBarra", request.codigoBarra);
        formData.append("unidadMedida", request.unidadMedida);
        formData.append("descripcion", request.descripcion);
        formData.append("marca", request.marca);
        formData.append("precioVentaActual", String(request.precioVentaActual));
        formData.append("stockMinimo", String(request.stockMinimo));
        formData.append("estado", String(request.estado));
        formData.append("categoriaId", String(request.categoriaId));
        formData.append("imagen", request.imagen);
        const { data } = await apiClient.post<ProductoResponse>("/productos", formData);
        return data;
    },

    createProductoAlmacen: async (almacenId: number, productoId: number): Promise<void> => {
        await apiClient.post<void>(`/productos/${productoId}/almacen/${almacenId}`, null);
    }

}