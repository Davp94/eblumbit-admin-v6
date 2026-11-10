export interface ProductoQueryParams {
    pageSize: number;
    pageNumber: number;
    search?: string;
    categoriaId?: number;
    estado?: boolean;
    marca?: string;
    sortBy?: string;
    isAscending?: boolean;
}