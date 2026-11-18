import { useState } from "react";
import type { ProductoResponse } from "../../types/productos/ProductoResponse";
import { useBuscarProducto } from "../../hooks/useProductos";
import { Alert, Autocomplete, Box, IconButton, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'

export interface CompraDetalleFormValue {
    key: number;
    productoId: number | null;
    cantidad: string;
    precioUnitarioCompra: string;
    observaciones: string;
}

interface CompraDetalleRowProps {
    almacenId: number;
    value: CompraDetalleFormValue;
    canRemove: boolean;
    onChange: (value: Partial<CompraDetalleFormValue>) => void;
    onRemove: () => void;
}

function CompraDetalleRow({almacenId, value, canRemove, onChange, onRemove}: CompraDetalleRowProps) {
    const [search, setSearch] = useState("");
    const [selectedProducto, setSelectedProducto] = useState<ProductoResponse | null>(null);
    const { data, isLoading, isError, error} = useBuscarProducto(search, almacenId);

    return (
        <Paper
            component="section"
            variant="outlined"
            sx={{ p: { xs: 2, sm: 2.5 }, borderRadius: 2.5, bgcolor: "background.default" }}
        >
            <Stack spacing={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1" fontWeight={600}>
                        Producto
                    </Typography>
                    <Tooltip title={canRemove ? "Eliminar producto" : "Debe haber al menos un producto"}>
                        <span>
                            <IconButton
                                onClick={onRemove}
                                disabled={!canRemove}
                                color="error"
                                size="small"
                                aria-label="Eliminar producto"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Stack>
                {isError && (
                    <Alert severity="error">No se pudieron buscar productos: {error.message}</Alert>
                )}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                        gap: 2,
                    }}
                >
                    <Autocomplete
                        fullWidth
                        options={data?.items ?? []}
                        value={selectedProducto}
                        inputValue={search}
                        loading={isLoading}
                        getOptionLabel={(producto) => producto.nombre}
                        filterOptions={(options) => options}
                        loadingText="Buscando productos..."
                        noOptionsText={search ? "No se encontraron productos" : "Escribe para buscar productos"}
                        onInputChange={(_, value, reason) => {
                            if (reason === 'input' || reason === 'clear') {
                                setSearch(value)
                            }
                        }}
                        onChange={(_, producto) => {
                            setSelectedProducto(producto)
                            onChange({productoId: producto?.id})
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Buscar producto"
                                placeholder="Busca por nombre o código de barras"
                            />
                        )}
                        sx={{ gridColumn: { sm: "1 / -1" } }}
                    />
                    <TextField
                        fullWidth
                        label="Cantidad"
                        type="number"
                        required
                        value={value.cantidad}
                        onChange={(event) => onChange({cantidad: event.target.value})}
                        inputProps={{ min: 0 }}
                    />
                    <TextField
                        fullWidth
                        label="Precio unitario de compra"
                        type="number"
                        required
                        value={value.precioUnitarioCompra}
                        onChange={(event) => onChange({precioUnitarioCompra: event.target.value})}
                        inputProps={{ min: 0, step: "any" }}
                    />
                    <TextField
                        fullWidth
                        label="Observaciones del producto"
                        value={value.observaciones}
                        onChange={(event) => onChange({observaciones: event.target.value})}
                        multiline
                        minRows={2}
                        sx={{ gridColumn: { sm: "1 / -1" } }}
                    />
                </Box>
            </Stack>
        </Paper>
    )
}

export default CompraDetalleRow;