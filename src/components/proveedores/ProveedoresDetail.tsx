import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import type { ProveedorResponse } from "../../types/proveedores/ProveedorResponse";

interface ProveedoresDetailProps {
    proveedor: ProveedorResponse | null;
    onClose: () => void;
}

function ProveedoresDetail({ proveedor, onClose }: ProveedoresDetailProps) {
    return (
        <Dialog open={!!proveedor} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Detalles del proveedor</DialogTitle>
            <DialogContent>
                <p><strong>Razón social:</strong> {proveedor?.razonSocial}</p>
                <p><strong>Número de identificación:</strong> {proveedor?.nroIdentificacion}</p>
                <p><strong>Contacto:</strong> {proveedor?.contacto}</p>
                <p><strong>Teléfono:</strong> {proveedor?.telefono}</p>
                <p><strong>Correo:</strong> {proveedor?.correo}</p>
                <p><strong>Observaciones:</strong> {proveedor?.observaciones || "Sin observaciones"}</p>
                <p><strong>Estado:</strong> {proveedor?.estado === null ? "Sin estado" : proveedor?.estado ? "Activo" : "Inactivo"}</p>
            </DialogContent>
        </Dialog>
    );
}

export default ProveedoresDetail;
