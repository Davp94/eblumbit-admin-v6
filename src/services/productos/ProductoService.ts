import type { PageResult } from "../../common/types/PageResult";
import { apiClient } from "../../config/service.config";
import type { ProductoQueryParams } from "../../types/productos/ProductoQueryParams";
import type { ProductoResponse } from "../../types/productos/ProductoResponse";

export const productoService = {
    getPoductosPaginacion: async (queryParams: ProductoQueryParams): Promise<PageResult<ProductoResponse>> => {
        const { data } = await apiClient.get<PageResult<ProductoResponse>>("/productos", {
            params: queryParams
        });
        return data;
    }
}