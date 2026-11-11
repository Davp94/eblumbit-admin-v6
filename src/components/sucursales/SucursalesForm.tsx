import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import TextFieldComponent from "../../common/components/TextFieldComponent";
import type { SucursalRequest } from "../../types/sucursales/SucursalRequest";
import type { SucursalResponse } from "../../types/sucursales/SucursalResponse";

interface SucursalesFormProps {
    open: boolean;
    sucursal: SucursalResponse | null;
    flagAction: "create" | "edit";
    loading: boolean;
    error: string | null;
    onClose: () => void;
    onSubmit: (values: SucursalRequest) => void | Promise<void>;
}

function SucursalesForm({ open, sucursal, flagAction, loading, error, onClose, onSubmit }: SucursalesFormProps) {
    const { control, reset, handleSubmit } = useForm<SucursalRequest>({
        defaultValues: { nombre: "", direccion: "", telefono: "", ciudad: "" },
    });

    useEffect(() => {
        reset({
            nombre: sucursal?.nombre ?? "",
            direccion: sucursal?.direccion ?? "",
            telefono: sucursal?.telefono ?? "",
            ciudad: sucursal?.ciudad ?? "",
        });
    }, [sucursal, reset]);

    return (
        <Dialog open={open} onClose={() => !loading && onClose()} fullWidth maxWidth="xs">
            <DialogTitle>{flagAction === "create" ? "Crear sucursal" : "Editar sucursal"}</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Stack spacing={2} sx={{ pt: 1 }}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextFieldComponent control={control} name="nombre" label="Nombre" variant="outlined" />
                        <TextFieldComponent control={control} name="direccion" label="Dirección" variant="outlined" />
                        <TextFieldComponent control={control} name="telefono" label="Teléfono" variant="outlined" />
                        <TextFieldComponent control={control} name="ciudad" label="Ciudad" variant="outlined" />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={onClose} disabled={loading}>Cancelar</Button>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? "Guardando..." : flagAction === "create" ? "Crear sucursal" : "Guardar cambios"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default SucursalesForm;
