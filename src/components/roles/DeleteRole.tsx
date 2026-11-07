import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import type { RolesResponse } from "../../types/roles/RolesResponse";

interface DeleteRoleProps {
    open: boolean;
    role: RolesResponse | null;
    loading: boolean;
    error: string | null;
    onClose: () => void;
    onConfirm: () => void;
}
function DeleteRole({
    open, role, loading, error, onClose, onConfirm
}: DeleteRoleProps) {
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
                Eliminar rol
            </DialogTitle>
            <DialogContent>
                Desea eliminar el rol?{' '}
                <strong>{role?.nombre}</strong>
                {error && <p className="text-red-600 mt-2">{error}</p>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancelar</Button>
                <Button onClick={onConfirm} disabled={loading}>Eliminar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteRole;
