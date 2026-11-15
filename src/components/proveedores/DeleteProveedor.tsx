import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import type { ProveedorResponse } from "../../types/proveedores/ProveedorResponse";

interface DeleteProveedorProps {
    open: boolean;
    proveedor: ProveedorResponse | null;
    loading: boolean;
    error: string | null;
    onClose: () => void;
    onConfirm: () => void;
}

function DeleteProveedor({ open, proveedor, loading, error, onClose, onConfirm }: DeleteProveedorProps) {
    return (
        <Dialog open={open} onClose={() => !loading && onClose()} fullWidth maxWidth="xs">
            <DialogTitle>Eliminar proveedor</DialogTitle>
            <DialogContent>
                ¿Desea eliminar al proveedor <strong>{proveedor?.razonSocial}</strong>?
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancelar</Button>
                <Button onClick={onConfirm} disabled={loading} color="error">Eliminar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteProveedor;
