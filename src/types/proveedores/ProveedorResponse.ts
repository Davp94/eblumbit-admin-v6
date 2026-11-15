export interface ProveedorResponse {
    id: number;
    razonSocial: string;
    nroIdentificacion: string;
    contacto: string;
    telefono: string;
    correo: string;
    observaciones: string | null;
    estado: boolean | null;
}