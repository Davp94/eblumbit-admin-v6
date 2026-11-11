import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import type { SucursalResponse } from "../../types/sucursales/SucursalResponse";

interface SucursalesDetailProps {
    sucursal: SucursalResponse | null;
    onClose: () => void;
}

function SucursalesDetail({ sucursal, onClose }: SucursalesDetailProps) {
    return (
        <Dialog open={!!sucursal} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Detalles de la sucursal</DialogTitle>
            <DialogContent>
                <p><strong>Nombre:</strong> {sucursal?.nombre}</p>
                <p><strong>Dirección:</strong> {sucursal?.direccion}</p>
                <p><strong>Teléfono:</strong> {sucursal?.telefono}</p>
                <p><strong>Ciudad:</strong> {sucursal?.ciudad}</p>
            </DialogContent>
        </Dialog>
    );
}

export default SucursalesDetail;
