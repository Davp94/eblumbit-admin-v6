import { Controller, useForm } from "react-hook-form";
import type { ProductoRequest } from "../../types/productos/ProductoRequest";
import { Alert, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Stack, TextField } from "@mui/material";
import { useEffect, type ChangeEvent } from "react";

interface ProductosFormProps {
    open: boolean;
    loading: boolean;
    error: string | null;
    onClose: () => void;
    onSubmit: (values: ProductoRequest) => void;
}
function ProductosForm({
    open, loading, error, onClose, onSubmit}
: ProductosFormProps) {
    const {
        control, 
        handleSubmit,
        register,
        reset, 
        setValue, 
        watch, 
        formState: {errors}
    } = useForm<ProductoRequest>({
        defaultValues: {
            nombre: "",
            codigoBarra: "",
            unidadMedida: "",
            marca: "",
            descripcion: "",
            precioVentaActual: 0,
            stockMinimo: 0,
            estado: true,
            categoriaId: 0
        },
    });

    useEffect(() => {
        if(open) {
            reset({
                nombre: "",
                codigoBarra: "",
                unidadMedida: "",
                marca: "",
                descripcion: "",
                precioVentaActual: 0,
                stockMinimo: 0,
                estado: true,
                categoriaId: 0
            })
        }
    }, [open, reset])

    const estado = watch("estado");

    return (
        <Dialog open={open} onClose={() => onClose()} fullWidth>
            <DialogTitle>Crear Producto</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Stack spacing={2}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField
                            label="Nombre"
                            {...register("nombre", {required: "El nombre es requerido"})}
                            error={!!errors.nombre}
                            helperText={errors.nombre?.message}
                        />
                        <TextField
                            label="Codigo de barras"
                            {...register("codigoBarra", {required: "El codigo de barras es requerido"})}
                            error={!!errors.codigoBarra}
                            helperText={errors.codigoBarra?.message}
                        />
                        <TextField
                            label="Unidad de medida"
                            {...register("unidadMedida", {required: "la unidad de medida es requerido"})}
                            error={!!errors.unidadMedida}
                            helperText={errors.unidadMedida?.message}
                        />
                        <TextField
                            label="Marca"
                            {...register("marca", {required: "La marca es requerida"})}
                            error={!!errors.marca}
                            helperText={errors.marca?.message}
                        />
                        <TextField
                            label="Descripcion"
                            multiline
                            minRows={2}
                            {...register("descripcion", {required: "La descripcion es requerida"})}
                            error={!!errors.descripcion}
                            helperText={errors.descripcion?.message}
                        />
                        <TextField
                            label="Descripcion"
                            multiline
                            minRows={2}
                            {...register("descripcion", {required: "La descripcion es requerida"})}
                            error={!!errors.descripcion}
                            helperText={errors.descripcion?.message}
                        />
                        <TextField
                            label="Precio de venta Actual"
                            type="number"
                            {...register("precioVentaActual", {
                                required: "El precio es requerido",
                                min: { value: 0, message: "El precio no puede ser negativo"}
                            })}
                            error={!!errors.precioVentaActual}
                            helperText={errors.precioVentaActual?.message}
                        />
                        <TextField
                            label="Stock mínimo"
                            type="number"
                            {...register("stockMinimo", {
                                required: "El stock es requerido",
                                min: { value: 0, message: "El stock no puede ser negativo"}
                            })}
                            error={!!errors.stockMinimo}
                            helperText={errors.stockMinimo?.message}
                        />
                        <Controller
                            control={control}
                            name="imagen"
                            rules={{required: "la imagen es requerida"}}
                            render={({field: {onChange, ref}, fieldState})=> (
                                <TextField
                                    inputRef={ref}
                                    type="file"
                                    label="Imagen"
                                    error={!!fieldState.error}
                                    slotProps={{htmlInput: {
                                        accept: "image/*",
                                        onChange: (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.files?.[0])
                                    }}}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                            />
                        <FormControlLabel 
                            control={<Checkbox checked={estado} onChange={(event) => setValue("estado", event.target.checked)} />} 
                            label="Activo" />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=> onClose()}>Cancelar</Button>
                    <Button type="submit" variant="contained" disabled={loading}>{loading ? 'Creando...': 'Crear Producto' }</Button>
                </DialogActions>
            </form>
        </Dialog>
    ) 
}

export default ProductosForm;