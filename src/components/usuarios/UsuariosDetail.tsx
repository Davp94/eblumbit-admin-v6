import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import type { UsuariosResponse } from "../../types/usuarios/UsuariosResponse";

interface UsuariosDetailProps {
    usuario: UsuariosResponse | null;
    onClose: () => void;
}

function UsuariosDetail({usuario, onClose}: UsuariosDetailProps) {

    return (
        <Dialog open={!!usuario} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Detalles del usuario</DialogTitle>
            <DialogContent>
                <p><strong>Nombres:</strong> {usuario?.nombres}</p>
                <p><strong>Apellidos:</strong> {usuario?.apellidos}</p>
                <p><strong>Username:</strong> {usuario?.username}</p>
                <p><strong>Correo:</strong> {usuario?.correo}</p>
                <p><strong>Roles:</strong> {usuario?.rolIds.map(rol => rol).join(', ')}</p>
            </DialogContent>
        </Dialog>
    );
}

export default UsuariosDetail;