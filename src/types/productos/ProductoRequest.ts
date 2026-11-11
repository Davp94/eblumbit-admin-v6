export interface ProductoRequest {
    nombre: string;
    descripcion: string;
    codigoBarra: string;
    unidadMedida: string;
    marca: string;
    imagen: File;
    precioVentaActual: number;
    stockMinimo: number;
    estado: boolean;
    categoriaId: number;
}