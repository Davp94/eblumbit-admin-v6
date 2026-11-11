import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import TextFieldComponent from "../../common/components/TextFieldComponent";
import { useSucursales } from "../../hooks/useSucursales";
import type { AlmacenRequest } from "../../types/almacenes/AlmacenRequest";
import type { AlmacenResponse } from "../../types/almacenes/AlmacenResponse";

interface AlmacenesFormProps {
    open: boolean;
    almacen: AlmacenResponse | null;
    flagAction: "create" | "edit";
    loading: boolean;
    error: string | null;
    onClose: () => void;
    onSubmit: (values: AlmacenRequest) => void | Promise<void>;
}

function AlmacenesForm({ open, almacen, flagAction, loading, error, onClose, onSubmit }: AlmacenesFormProps) {
    const { control, reset, handleSubmit } = useForm<AlmacenRequest>({
        defaultValues: { codigo: "", nombre: "", descripcion: "", sucursalId: 0 },
    });
    const { data: sucursales, isLoading: loadingSucursales, error: sucursalesError } = useSucursales();

    useEffect(() => {
        reset({
            codigo: almacen?.codigo ?? "",
            nombre: almacen?.nombre ?? "",
            descripcion: almacen?.descripcion ?? "",
            sucursalId: almacen?.sucursalId ?? 0,
        });
    }, [almacen, reset]);

    return (
        <Dialog open={open} onClose={() => !loading && onClose()} fullWidth maxWidth="xs">
            <DialogTitle>{flagAction === "create" ? "Crear almacén" : "Editar almacén"}</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Stack spacing={2} sx={{ pt: 1 }}>
                        {error && <Alert severity="error">{error}</Alert>}
                        {sucursalesError && <Alert severity="error">No se pudieron cargar las sucursales: {sucursalesError.message}</Alert>}
                        <TextFieldComponent control={control} name="codigo" label="Código" variant="outlined" rules={{ required: "El código es requerido" }} />
                        <TextFieldComponent control={control} name="nombre" label="Nombre" variant="outlined" rules={{ required: "El nombre es requerido" }} />
                        <TextFieldComponent control={control} name="descripcion" label="Descripción" variant="outlined" />
                        <Controller
                            control={control}
                            name="sucursalId"
                            rules={{ required: "La sucursal es requerida", min: { value: 1, message: "Seleccione una sucursal" } }}
                            render={({ field, fieldState }) => (
                                <FormControl fullWidth error={!!fieldState.error}>
                                    <InputLabel id="almacen-sucursal-select-label">Sucursal</InputLabel>
                                    <Select {...field} labelId="almacen-sucursal-select-label" label="Sucursal">
                                        {(sucursales ?? []).map((sucursal) => (
                                            <MenuItem key={sucursal.id} value={sucursal.id}>{sucursal.nombre}</MenuItem>
                                        ))}
                                    </Select>
                                    {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                        {loadingSucursales && <Alert severity="info">Cargando sucursales...</Alert>}
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={onClose} disabled={loading}>Cancelar</Button>
                    <Button type="submit" variant="contained" disabled={loading || loadingSucursales || !sucursales?.length}>
                        {loading ? "Guardando..." : flagAction === "create" ? "Crear almacén" : "Guardar cambios"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default AlmacenesForm;
