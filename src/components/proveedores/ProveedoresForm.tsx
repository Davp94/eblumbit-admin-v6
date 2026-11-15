import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import TextFieldComponent from "../../common/components/TextFieldComponent";
import type { ProveedorRequest } from "../../types/proveedores/ProveedorRequest";
import type { ProveedorResponse } from "../../types/proveedores/ProveedorResponse";

interface ProveedoresFormProps {
    open: boolean;
    proveedor: ProveedorResponse | null;
    flagAction: "create" | "edit";
    loading: boolean;
    error: string | null;
    onClose: () => void;
    onSubmit: (values: ProveedorRequest) => void | Promise<void>;
}

function ProveedoresForm({ open, proveedor, flagAction, loading, error, onClose, onSubmit }: ProveedoresFormProps) {
    const { control, reset, handleSubmit } = useForm<ProveedorRequest>({
        defaultValues: {
            razonSocial: "",
            nroIdentificacion: "",
            contacto: "",
            telefono: "",
            correo: "",
            observaciones: "",
        },
    });

    useEffect(() => {
        reset({
            razonSocial: proveedor?.razonSocial ?? "",
            nroIdentificacion: proveedor?.nroIdentificacion ?? "",
            contacto: proveedor?.contacto ?? "",
            telefono: proveedor?.telefono ?? "",
            correo: proveedor?.correo ?? "",
            observaciones: proveedor?.observaciones ?? "",
        });
    }, [proveedor, reset]);

    return (
        <Dialog open={open} onClose={() => !loading && onClose()} fullWidth maxWidth="sm">
            <DialogTitle>{flagAction === "create" ? "Crear proveedor" : "Editar proveedor"}</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Stack spacing={2} sx={{ pt: 1 }}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextFieldComponent
                            control={control}
                            name="razonSocial"
                            label="Razón social"
                            variant="outlined"
                            rules={{ required: "La razón social es requerida" }}
                        />
                        <TextFieldComponent
                            control={control}
                            name="nroIdentificacion"
                            label="Número de identificación"
                            variant="outlined"
                            rules={{ required: "El número de identificación es requerido" }}
                        />
                        <TextFieldComponent control={control} name="contacto" label="Contacto" variant="outlined" />
                        <TextFieldComponent control={control} name="telefono" label="Teléfono" variant="outlined" />
                        <TextFieldComponent
                            control={control}
                            name="correo"
                            label="Correo"
                            variant="outlined"
                            rules={{
                                validate: (value: string) =>
                                    !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Ingresa un correo válido",
                            }}
                        />
                        <TextFieldComponent control={control} name="observaciones" label="Observaciones" variant="outlined" />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={onClose} disabled={loading}>Cancelar</Button>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? "Guardando..." : flagAction === "create" ? "Crear proveedor" : "Guardar cambios"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default ProveedoresForm;
