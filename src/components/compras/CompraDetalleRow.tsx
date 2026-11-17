import { useState } from "react";
import type { ProductoResponse } from "../../types/productos/ProductoResponse";
import { useBuscarProducto } from "../../hooks/useProductos";
import { Alert, Autocomplete, Box, IconButton, Stack, TextField } from "@mui/material";
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
        <Box>
            <Stack>
                <Stack>
                    <label>Producto</label>
                    <IconButton onClick={onRemove} disabled={!canRemove} color="error">
                        <DeleteIcon /> 
                    </IconButton>
                </Stack>
                {isError && (
                    <Alert severity="error">No se pudieron buscar productos: {error.message}</Alert>
                )}
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
                    sx={{ mt: 0.5 }}
                />
                <Box>
                    <TextField
                        label="Cantidad"
                        type="number"
                        required
                        value={value.cantidad}
                        onChange={(event) => onChange({cantidad: event.target.value})}
                    />
                    <TextField
                        label="Precio Unitario de compra"
                        type="number"
                        required
                        value={value.precioUnitarioCompra}
                        onChange={(event) => onChange({precioUnitarioCompra: event.target.value})}
                    />
                </Box>
                <TextField
                    label="Observaciones del producto"
                    value={value.observaciones}
                    onChange={(event) => onChange({observaciones: event.target.value})}
                    multiline
                    minRows={2}
                />
            </Stack>
        </Box>
    )
}

export default CompraDetalleRow;