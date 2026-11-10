export interface ProductoResponse {
    id: number;
    nombre: string;
    descripcion: string;
    codigoBarra: string;
    unidadMedida: string;
    marca: string;
    imagen: string;
    precioVentaActual: number;
    stockMinimo: number;
    estado: boolean;
    fechaRegistro: string;
    categoriaId: number;
    categoriaNombre: string;
}