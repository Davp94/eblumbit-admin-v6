import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import type { SucursalResponse } from "../../types/sucursales/SucursalResponse";

interface DeleteSucursalProps {
    open: boolean;
    sucursal: SucursalResponse | null;
    loading: boolean;
    error: string | null;
    onClose: () => void;
    onConfirm: () => void;
}

function DeleteSucursal({ open, sucursal, loading, error, onClose, onConfirm }: DeleteSucursalProps) {
    return (
        <Dialog open={open} onClose={() => !loading && onClose()} fullWidth maxWidth="xs">
            <DialogTitle>Eliminar sucursal</DialogTitle>
            <DialogContent>
                ¿Desea eliminar la sucursal <strong>{sucursal?.nombre}</strong>?
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancelar</Button>
                <Button onClick={onConfirm} disabled={loading} color="error">Eliminar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteSucursal;
