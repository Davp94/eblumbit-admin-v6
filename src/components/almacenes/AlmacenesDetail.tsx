import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import type { AlmacenResponse } from "../../types/almacenes/AlmacenResponse";

interface AlmacenesDetailProps {
    almacen: AlmacenResponse | null;
    onClose: () => void;
}

function AlmacenesDetail({ almacen, onClose }: AlmacenesDetailProps) {
    return (
        <Dialog open={!!almacen} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Detalles del almacén</DialogTitle>
            <DialogContent>
                <p><strong>Código:</strong> {almacen?.codigo}</p>
                <p><strong>Nombre:</strong> {almacen?.nombre}</p>
                <p><strong>Descripción:</strong> {almacen?.descripcion}</p>
                <p><strong>Sucursal:</strong> {almacen?.sucursalNombre}</p>
            </DialogContent>
        </Dialog>
    );
}

export default AlmacenesDetail;
