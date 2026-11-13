import { useState } from "react";
import type { ProductoResponse } from "../../types/productos/ProductoResponse";
import { useBuscarProducto } from "../../hooks/useProductos";
import { Alert, Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import type { AlmacenResponse } from "../../types/almacenes/AlmacenResponse";

interface InventoryProductosFormProps {
    open: boolean;
    almacen: AlmacenResponse | null;
    loading: boolean;
    error: string | null;
    onClose: () => void;
    onSubmit: (productoId: number) => void;
}
function InventoryProductosForm({open, almacen, loading, error, onClose, onSubmit}: InventoryProductosFormProps) {

    const [search, setSearch] = useState('');
    const [selectedProducto, setSelectedProducto] = useState<ProductoResponse | null>(null);
    const { data, isLoading: searching, isError, error: searchError} = useBuscarProducto(search);


    const closeForm = () => {
        setSearch("")
        setSelectedProducto(null)
        onClose()
    }

    return (
        <Dialog
            open={open}
            onClose={closeForm}
            fullWidth
            maxWidth="sm"
            sx={{ "& .MuiDialog-paper": { borderRadius: 3 } }}
        >
            <DialogTitle sx={{ pb: 1 }}>
                <Typography component="h2" variant="h6" fontWeight={700}>
                    Agregar producto al almacén
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Busca y selecciona el producto que deseas agregar.
                </Typography>
            </DialogTitle>
            <DialogContent sx={{ pt: 2 }}>
                <Stack spacing={2.5}>
                    {error && <Alert severity="error">{error}</Alert>}
                    {almacen ? (
                        <Box
                            sx={{
                                p: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                bgcolor: 'action.hover'
                            }}
                        >
                            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
                                Almacén seleccionado
                            </Typography>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
                                    gap: 1.5
                                }}
                            >
                                <Box sx={{ minWidth: 0 }}>
                                    <Typography variant="caption" color="text.secondary">Nombre</Typography>
                                    <Typography variant="body2" fontWeight={600}>{almacen.nombre}</Typography>
                                </Box>
                                <Box sx={{ minWidth: 0 }}>
                                    <Typography variant="caption" color="text.secondary">Código</Typography>
                                    <Typography variant="body2" fontWeight={600}>{almacen.codigo}</Typography>
                                </Box>
                                <Box sx={{ minWidth: 0 }}>
                                    <Typography variant="caption" color="text.secondary">Sucursal</Typography>
                                    <Typography variant="body2" fontWeight={600}>{almacen.sucursalNombre}</Typography>
                                </Box>
                                {almacen.descripcion && (
                                    <Box sx={{ minWidth: 0, gridColumn: { xs: 'auto', sm: '1 / -1' } }}>
                                        <Typography variant="caption" color="text.secondary">Descripción</Typography>
                                        <Typography variant="body2">{almacen.descripcion}</Typography>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    ) : (
                        <Alert severity="warning">Selecciona un almacén para agregar productos.</Alert>
                    )}
                    {isError && (
                        <Alert severity="error">
                            No se pudieron buscar productos: {searchError.message}
                        </Alert>
                    )}
                    <Autocomplete
                        fullWidth
                        options={data?.items ?? []}
                        value={selectedProducto}
                        inputValue={search}
                        loading={searching}
                        disabled={!almacen || loading}
                        getOptionLabel={(producto) => producto.nombre}
                        filterOptions={(options) => options}
                        loadingText="Buscando productos..."
                        noOptionsText={search ? "No se encontraron productos" : "Escribe para buscar productos"}
                        onInputChange={(_, value, reason) => {
                            if (reason === 'input' || reason === 'clear') {
                                setSearch(value)
                            }
                        }}
                        onChange={(_, producto) => setSelectedProducto(producto)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Buscar producto"
                                placeholder="Busca por nombre o código de barras"
                            />
                        )}
                        sx={{ mt: 0.5 }}
                    />
                    {selectedProducto && (
                        <Alert severity="info" sx={{ alignItems: 'center' }}>
                            Se agregará
                            <Box component="span" sx={{ mx: 0.5, fontWeight: 600 }}>
                                {selectedProducto.nombre}
                            </Box>
                            al almacén seleccionado.
                        </Alert>
                    )}
                </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
                <Button onClick={closeForm}>Cancelar</Button>
                <Button
                    variant="contained"
                    onClick={() => selectedProducto && onSubmit(selectedProducto.id)}
                    disabled={loading || !almacen || !selectedProducto}
                >
                    {loading ? "Agregando..." : "Agregar al almacén"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default InventoryProductosForm;