import { useEffect, useState } from "react";
import {
  useAddProductoAlmacen,
  useCreateProducto,
  useProductos,
} from "../../hooks/useProductos";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import InventoryTable from "./InventoryTable";
import { useSucursales } from "../../hooks/useSucursales";
import { useAlmacenesBySucursal } from "../../hooks/useAlmacenes";
import type { ProductoRequest } from "../../types/productos/ProductoRequest";
import ProductosForm from "./ProductosForm";
import InventoryProductosForm from "./InventoryProductosForm";

function InventoryPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebuncedSearch] = useState("");
  const [selectedSucursalId, setSelectedSucursalId] = useState<number | "">("");
  const [selectedAlmacenId, setSelectedAlmacenId] = useState<number | "">("");
  const {
    data: sucursales,
    isLoading: isLoadingSucursales,
    error: sucursalesError,
  } = useSucursales();
  const {
    data: sucursalAlmacenes,
    isLoading: isLoadingAlmacenes,
    error: almacenesError,
  } = useAlmacenesBySucursal(selectedSucursalId || 0);
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [assignFormOpen, setAssignFormOpen] = useState(false);
  const selectedAlmacen = sucursalAlmacenes?.find((almacen) => almacen.id === selectedAlmacenId) ?? null;
  const createProducto = useCreateProducto();
  const addProductoAlmacen = useAddProductoAlmacen();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebuncedSearch(search), 300);
    return () => window.clearTimeout(timeoutId);
  }, [search]);

  const handleCreateProducto = (producto: ProductoRequest) => {
    createProducto.mutate(producto, {
      onSuccess: () => setCreateFormOpen(false),
    });
  };

  const handleAssignProducto = (productoId: number) => {
    if (!selectedAlmacenId) return;
    addProductoAlmacen.mutate(
      { productoId, almacenId: selectedAlmacenId },
      { onSuccess: () => setAssignFormOpen(false) },
    );
  };

  const { data, isLoading, isError, error, refetch } = useProductos({
    pageNumber,
    pageSize,
    almacenId: selectedAlmacenId || undefined,
    search: debouncedSearch.trim(),
  });
  return (
    <Box sx={{ p: 3 }}>
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          borderColor: "gray",
        }}
      >
        <Stack spacing={2.5}>
          <Stack
            direction={"row"}
            spacing={2}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Box>
              <label className="text-2xl">Inventario</label>
              <label>Consulta de productos por sucursal y almacen</label>
            </Box>
            <Stack>
              <Button variant="outlined" 
              onClick={() => {createProducto.reset(); setCreateFormOpen(true)}}>
                Crear Producto
              </Button>
              <Button variant="outlined" disabled={!selectedAlmacenId}
              onClick={() => {addProductoAlmacen.reset(); setAssignFormOpen(true)}}>Agregar al Almacen</Button>
            </Stack>
          </Stack>
          <Box 
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                gap: 1.5,
                alignItems: 'center'
            }}>
            <FormControl fullWidth>
              <InputLabel id="inventory-sucursal-label">Sucursal</InputLabel>
              <Select
                labelId="inventory-sucursal-label"
                label="Sucursal"
                value={selectedSucursalId}
                onChange={(event) => {
                  const sucursalId = event.target.value;
                  setSelectedSucursalId(Number(sucursalId));
                  setSelectedAlmacenId("");
                  setPageNumber(1);
                }}
                disabled={isLoadingSucursales || !!sucursalesError}
              >
                <MenuItem value="">Seleccione una sucursal</MenuItem>
                {sucursales?.map((sucursal) => (
                  <MenuItem key={sucursal.id} value={sucursal.id}>
                    {sucursal.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="inventory-almacen-label">Almacen</InputLabel>
              <Select
                labelId="inventory-almacen-label"
                label="Almacen"
                value={selectedAlmacenId}
                onChange={(event) => {
                  const almacenId = event.target.value;
                  setSelectedAlmacenId(Number(almacenId));
                  setPageNumber(1);
                }}
                disabled={isLoadingAlmacenes || !!almacenesError}
              >
                <MenuItem value="">Seleccione un almacén</MenuItem>
                {sucursalAlmacenes?.map((almacen) => (
                  <MenuItem key={almacen.id} value={almacen.id}>
                    {almacen.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="flex-row -space-x-2">
              <TextField
                label="Buscar Productos"
                size="small"
                value={search}
                disabled={!selectedAlmacenId}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPageNumber(1);
                }}
              />
              <Button
                variant="contained"
                onClick={() => refetch()}
                disabled={!selectedAlmacenId || isLoading}
              >
                Actualizar
              </Button>
            </div>
          </Box>
        </Stack>
      </Paper>
      {selectedAlmacenId ? (
        <InventoryTable
          productos={data?.items ?? []}
          totalCount={data?.totalCount ?? 0}
          pageNumber={pageNumber}
          pageSize={pageSize}
          loading={isLoading}
          error={isError ? error.message : undefined}
          onPageChange={setPageNumber}
          onPageSizeChange={(newPageSize) => {
            setPageSize(newPageSize);
            setPageNumber(1);
          }}
        />
      ) : (
        <Alert severity="info">
          Seleccione una sucursal y un almacen para consultar el inventario
        </Alert>
      )}
      <ProductosForm
        open={createFormOpen}
        loading={createProducto.isPending}
        error={createProducto.error?.message ?? null}
        onClose={() => setCreateFormOpen(false)}
        onSubmit={handleCreateProducto}
      />
      <InventoryProductosForm
        open={assignFormOpen}
        almacen={selectedAlmacen}
        loading={addProductoAlmacen.isPending}
        error={addProductoAlmacen.error?.message ?? null}
        onClose={() => setAssignFormOpen(false)}
        onSubmit={handleAssignProducto}
      />
    </Box>
  );
}

export default InventoryPage;
