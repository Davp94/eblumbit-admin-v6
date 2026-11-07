import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import type { PermissionResponse } from "../../types/permissions/PermissionResponse";

interface DeletePermissionProps {
    open: boolean;
    permission: PermissionResponse | null;
    loading: boolean;
    error: string | null;
    onClose: () => void;
    onConfirm: () => void;
}
function DeletePermission({
    open, permission, loading, error, onClose, onConfirm
}: DeletePermissionProps) {
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
                Eliminar permiso
            </DialogTitle>
            <DialogContent>
                Desea eliminar el permiso?{' '}
                <strong>{permission?.nombre}</strong>
                {error && <p className="text-red-600 mt-2">{error}</p>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancelar</Button>
                <Button onClick={onConfirm} disabled={loading}>Eliminar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeletePermission;
