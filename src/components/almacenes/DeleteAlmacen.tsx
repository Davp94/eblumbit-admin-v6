import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import type { AlmacenResponse } from "../../types/almacenes/AlmacenResponse";

interface DeleteAlmacenProps {
    open: boolean;
    almacen: AlmacenResponse | null;
    loading: boolean;
    error: string | null;
    onClose: () => void;
    onConfirm: () => void;
}

function DeleteAlmacen({ open, almacen, loading, error, onClose, onConfirm }: DeleteAlmacenProps) {
    return (
        <Dialog open={open} onClose={() => !loading && onClose()} fullWidth maxWidth="xs">
            <DialogTitle>Eliminar almacén</DialogTitle>
            <DialogContent>
                ¿Desea eliminar el almacén <strong>{almacen?.nombre}</strong>?
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancelar</Button>
                <Button onClick={onConfirm} disabled={loading} color="error">Eliminar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteAlmacen;
