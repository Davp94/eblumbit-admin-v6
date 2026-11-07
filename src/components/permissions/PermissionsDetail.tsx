import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import type { PermissionResponse } from "../../types/permissions/PermissionResponse";

interface PermissionsDetailProps {
    permission: PermissionResponse | null;
    onClose: () => void;
}

function PermissionsDetail({permission, onClose}: PermissionsDetailProps) {

    return (
        <Dialog open={!!permission} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Detalles del permiso</DialogTitle>
            <DialogContent>
                <p><strong>Nombre:</strong> {permission?.nombre}</p>
                <p><strong>Detalle:</strong> {permission?.detalle}</p>
                <p><strong>Descripcion:</strong> {permission?.descripcion}</p>
                <p><strong>Subject:</strong> {permission?.subject}</p>
                <p><strong>Action:</strong> {permission?.action}</p>
            </DialogContent>
        </Dialog>
    );
}

export default PermissionsDetail;
