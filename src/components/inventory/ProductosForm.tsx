import { Controller, useForm } from "react-hook-form";
import type { ProductoRequest } from "../../types/productos/ProductoRequest";
import { Alert, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useId, useState, type ChangeEvent } from "react";

interface ProductosFormProps {
    open: boolean;
    loading: boolean;
    error: string | null;
    onClose: () => void;
    onSubmit: (values: ProductoRequest) => void;
}

function formatFileSize(size: number) {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
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
    const imagen = watch("imagen");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const imageInputId = useId();
    const imageErrorId = `${imageInputId}-error`;

    useEffect(() => {
        if(!imagen) {
            setImagePreview(null);
            return;
        }
        const previewUrl = URL.createObjectURL(imagen);
        setImagePreview(previewUrl);

        return () => URL.revokeObjectURL(previewUrl);
    },[imagen]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            sx={{ "& .MuiDialog-paper": { borderRadius: 3 } }}
        >
            <DialogTitle sx={{ pb: 1 }}>
                <label className="text-2xl font-bold">Crear Producto</label>
                <Typography color="text.secondary" variant="body2" sx={{ mt: 0.5 }}>
                    Completa la información para registrar un producto.
                </Typography>
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent sx={{ pt: 2 }}>
                    <Stack spacing={2}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
                            gap: 2
                        }}>
                        <TextField
                            label="Nombre"
                            fullWidth
                            {...register("nombre", {required: "El nombre es requerido"})}
                            error={!!errors.nombre}
                            helperText={errors.nombre?.message}
                        />
                        <TextField
                            label="Código de barras"
                            fullWidth
                            {...register("codigoBarra", {required: "El código de barras es requerido"})}
                            error={!!errors.codigoBarra}
                            helperText={errors.codigoBarra?.message}
                        />
                        <TextField
                            label="Unidad de medida"
                            fullWidth
                            {...register("unidadMedida", {required: "La unidad de medida es requerida"})}
                            error={!!errors.unidadMedida}
                            helperText={errors.unidadMedida?.message}
                        />
                        <TextField
                            label="Marca"
                            fullWidth
                            {...register("marca", {required: "La marca es requerida"})}
                            error={!!errors.marca}
                            helperText={errors.marca?.message}
                        />
                        <TextField
                            label="Descripción"
                            sx={{ gridColumn: '1 / -1' }}
                            fullWidth
                            multiline
                            minRows={2}
                            {...register("descripcion", {required: "La descripcion es requerida"})}
                            error={!!errors.descripcion}
                            helperText={errors.descripcion?.message}
                        />
                        <TextField
                            label="Precio de venta actual"
                            fullWidth
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
                            fullWidth
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
                            rules={{required: "La imagen es requerida"}}
                            render={({field: {onChange, name, ref}, fieldState}) => (
                                <Box sx={{ gridColumn: '1 / -1' }}>
                                    <label
                                        htmlFor={imageInputId}
                                        className="mb-1 block text-sm font-medium text-gray-700"
                                    >
                                        Imagen del producto
                                    </label>
                                    <label
                                        htmlFor={imageInputId}
                                        className={`group flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-7 text-center transition-colors hover:border-blue-500 hover:bg-blue-50/50 ${
                                            fieldState.error ? "border-red-500" : "border-gray-300"
                                        }`}
                                    >
                                        <input
                                            id={imageInputId}
                                            ref={ref}
                                            name={name}
                                            type="file"
                                            accept="image/*"
                                            aria-label="Seleccionar imagen del producto"
                                            aria-invalid={!!fieldState.error}
                                            aria-describedby={fieldState.error ? imageErrorId : undefined}
                                            className="peer sr-only"
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                const file = event.target.files?.[0];
                                                if (file) onChange(file);
                                                event.target.value = "";
                                            }}
                                        />
                                        <span className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-700 transition-colors group-hover:bg-blue-200 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-600 peer-focus-visible:ring-offset-2">
                                            <svg
                                                aria-hidden="true"
                                                className="h-5 w-5"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0L7 9m5-5 5 5M4 16.5v2A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5v-2" />
                                            </svg>
                                        </span>
                                        <span className="text-sm font-semibold text-gray-800">
                                            {imagen ? "Cambiar imagen" : "Selecciona una imagen"}
                                        </span>
                                        <span className="mt-1 text-xs text-gray-500">
                                            Haz clic para buscar un archivo de imagen en tu dispositivo.
                                        </span>
                                    </label>
                                    {imagen && (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                                mt: 2,
                                                p: 1.5,
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                borderRadius: 2
                                            }}
                                        >
                                            {imagePreview && (
                                                <Box
                                                    component="img"
                                                    src={imagePreview}
                                                    alt={`Vista previa de ${imagen.name}`}
                                                    sx={{
                                                        width: 72,
                                                        height: 72,
                                                        objectFit: 'cover',
                                                        borderRadius: 1,
                                                        bgcolor: 'action.hover'
                                                    }}
                                                />
                                            )}
                                            <Box sx={{ minWidth: 0 }}>
                                                <Typography variant="body2" noWrap sx={{ fontWeight: 600 }}>
                                                    {imagen.name}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                    {formatFileSize(imagen.size)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )}
                                    {fieldState.error && (
                                        <small id={imageErrorId} className="mt-1 block text-sm text-red-600">
                                            {fieldState.error.message}
                                        </small>
                                    )}
                                </Box>
                            )}
                        />
                        <FormControlLabel 
                            control={<Checkbox checked={estado} onChange={(event) => setValue("estado", event.target.checked)} />} 
                            label="Activo"
                            sx={{ gridColumn: '1 / -1', ml: 0 }}
                        />
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2.5 }}>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? 'Creando...' : 'Crear producto'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    ) 
}

export default ProductosForm;