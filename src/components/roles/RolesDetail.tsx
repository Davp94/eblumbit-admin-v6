import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import type { RolesResponse } from "../../types/roles/RolesResponse";

interface RolesDetailProps {
    role: RolesResponse | null;
    onClose: () => void;
}

function RolesDetail({role, onClose}: RolesDetailProps) {

    return (
        <Dialog open={!!role} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Detalles del rol</DialogTitle>
            <DialogContent>
                <p><strong>Nombre:</strong> {role?.nombre}</p>
                <p><strong>Descripcion:</strong> {role?.descripcion}</p>
                <p><strong>Permisos:</strong> {role?.permisosIds?.map(permiso => permiso).join(', ')}</p>
            </DialogContent>
        </Dialog>
    );
}

export default RolesDetail;
