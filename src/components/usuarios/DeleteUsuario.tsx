import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import type { UsuariosResponse } from "../../types/usuarios/UsuariosResponse";

interface DeleteUsuarioProps {
    open: boolean;
    usuario: UsuariosResponse | null;
    loading: boolean;
    error: string | null;
    onClose: () => void;
    onConfirm: () => void;
}
function DeleteUsuario({
    open, usuario, loading, error, onClose, onConfirm
}: DeleteUsuarioProps) {
    return (
        <Dialog
            open={open}
            onClose={()=> {
                if(!loading){
                    onClose();
                }
            }}
            fullWidth
            maxWidth='xs'
        >
            <DialogTitle>
                Eliminar usuario
            </DialogTitle>
            <DialogContent>
                Desea eliminar el usuario?{' '}
                <strong>{usuario?.username}</strong>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancelar</Button>
                <Button onClick={onConfirm} disabled={loading}>Eliminar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteUsuario;