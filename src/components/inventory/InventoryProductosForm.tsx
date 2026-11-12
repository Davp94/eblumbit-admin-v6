import { useState } from "react";
import type { ProductoResponse } from "../../types/productos/ProductoResponse";
import { useBuscarProducto } from "../../hooks/useProductos";
import { Alert, Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";

interface InventoryProductosFormProps {
    open: boolean;
    almacenId: number | null;
    loading: boolean;
    error: string | null;
    onClose: () => void;
    onSubmit: (productoId: number) => void;
}
function InventoryProductosForm({open, almacenId, loading, error, onClose, onSubmit}: InventoryProductosFormProps) {

    const [search, setSearch] = useState('');
    const [selectedProducto, setSelectedProducto] = useState<ProductoResponse | null>(null);
    const { data, isLoading, searching, isError, error: searchError} = useBuscarProducto(search);


    const closeForm = () => {
        setSearch("")
        setSelectedProducto(null)
        onClose()
    }

    return (
        <Dialog open={open} onClose={() => closeForm()} fullWidth>
            <DialogTitle>Agregar producto al almacen</DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    {error && <Alert severity="error">{error}</Alert>}
                    {!almacenId && <Alert severity="warning">Seleccione un almacen para agregar productos</Alert>}
                </Stack>
                <Autocomplete
                    options={data?.items ?? []}
                    value={selectedProducto}
                    inputValue={search}
                    loading={searching}
                    getOptionLabel={(producto) =>`${producto.nombre}`}
                    filterOptions={(options) => options}
                    loadingText="Buscando productos ..."
                    onInputChange={(_, value, reason) => {
                        if(reason === 'input' || reason ==='clear' ){
                            setSearch(value)
                        }
                    }}
                    onChange={(_, producto) => setSelectedProducto(producto)}

                />
                {selectedProducto && (
                    <Alert severity="warning">
                        Se agregará {selectedProducto.nombre} al almacén seleccionado.
                    </Alert>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => closeForm()}>Cancelar</Button>
                <Button onClick={() => selectedProducto && onSubmit(selectedProducto.id)}>Agregar al almacén</Button>
            </DialogActions>
        </Dialog>
    )
}

export default InventoryProductosForm;