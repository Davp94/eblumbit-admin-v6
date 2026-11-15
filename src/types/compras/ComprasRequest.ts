import type { DetalleCompraRequest } from "./DetalleCompraRequest";

export interface CompraRequest {
    proveedorId: number;
    usuarioid: number;
    descuentoTotal: number | null;
    detalle: string | null;
    observaciones: string | null;
    detalleCompra: DetalleCompraRequest[];
}