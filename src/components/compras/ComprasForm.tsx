import { useAuthStore } from "../../state-management/authStore";
import { useProveedores } from "../../hooks/useProveedores";
import { useRef, useState, type FormEvent } from "react";
import type { ProveedorResponse } from "../../types/proveedores/ProveedorResponse";
import type { CompraDetalleFormValue } from "./CompraDetalleRow";
import { Alert, Autocomplete, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import CompraDetalleRow from "./CompraDetalleRow";
import AddIcon from '@mui/icons-material/Add'
import type { CompraRequest } from "../../types/compras/ComprasRequest";

function makeEmptyDetalle(key: number): CompraDetalleFormValue {
  return {
    key,
    productoId: null,
    cantidad: "1",
    precioUnitarioCompra: "",
    observaciones: "",
  };
}
interface CompraFormProps {
    almacenId: number;
    loading: boolean;
    error: string | null;
    onSubmit: (request: CompraRequest) => void;
    onCancel: () => void;
}
function ComprasForm({almacenId, loading, error, onSubmit, onCancel}: CompraFormProps) {
  
  const usuarioId = useAuthStore((state) => state.identifier);
  const {
    data: proveedores,
    isLoading: isLoadingProveedores,
    isError: proveedoresError,
    error: errorProveedores,
  } = useProveedores();
  const [selectedProveedor, setSelectedProveedor] =
    useState<ProveedorResponse | null>(null);
  const [proveedorSearch, setProveedorSearch] = useState("");
  const [descuentoTotal, setDescuentoTotal] = useState("");
  const [detalle, setDetalle] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const nextKey = useRef(1);
  const [detalleCompra, setDetalleCompra] = useState<CompraDetalleFormValue[]>([
    makeEmptyDetalle(0),
  ]);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!Number.isInteger(almacenId) || Number(almacenId) <= 0) {
      setValidationError("No se recibio un almacen válido");
      return;
    }
    if (!usuarioId) {
      setValidationError("No se encontró al usuario de la sesión");
      return;
    }
    if (!selectedProveedor) {
      setValidationError("Debe seleccionar un proveedor");
      return;
    }
    if(descuentoTotal.trim() && (!Number.isFinite(Number(descuentoTotal)) || Number(descuentoTotal)<0)){
        setValidationError('El descuento total debe ser un numero mayor o igual a 0')
        return;
    }
    const detailProductos = detalleCompra.filter(
      (item) => item.productoId !== null,
    );
    setValidationError(null);
    onSubmit({
      proveedorId: selectedProveedor.id,
      usuarioId: usuarioId,
      descuentoTotal: Number(descuentoTotal),
      detalle: detalle.trim() || null,
      observaciones: observaciones.trim() || null,
      detalleCompra: detailProductos.map((item) => ({
        productoId: Number(item.productoId),
        almacenId: almacenId,
        cantidad: Number(item.cantidad),
        observaciones: item.observaciones.trim() || null,
        precioUnitarioCompra: Number(item.precioUnitarioCompra),
      })),
    });
  };

  const filteredProveedores = (proveedores ?? []).filter((proveedor) => {
    const query = proveedorSearch.trim().toLocaleLowerCase();
    return (
      !query ||
      proveedor.razonSocial.toLocaleLowerCase().includes(query) ||
      proveedor.nroIdentificacion.toLocaleLowerCase().includes(query)
    );
  });

  return (
    <Box sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h5" component="h2" fontWeight={700}>
            Nueva compra
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Selecciona un proveedor y agrega los productos que ingresarán al almacén.
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {error && <Alert severity="error">{error}</Alert>}
            {proveedoresError && (
              <Alert severity="error">
                Error al cargar proveedores {errorProveedores.message}
              </Alert>
            )}
            {validationError && <Alert severity="error">{validationError}</Alert>}
            {!usuarioId && (
              <Alert severity="error">
                No se encontró el usuario de la sesión
              </Alert>
            )}
            <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
              <Stack spacing={2.5}>
                <Typography variant="h6" component="h3" fontWeight={600}>
                  Información de la compra
                </Typography>
                <Autocomplete
                  fullWidth
                  options={filteredProveedores}
                  value={selectedProveedor}
                  inputValue={proveedorSearch}
                  loading={isLoadingProveedores}
                  getOptionLabel={(proveedor) => proveedor.razonSocial}
                  loadingText="Cargando proveedores..."
                  noOptionsText={
                    proveedorSearch
                      ? "No se encontraron proveedores"
                      : "Escribe para buscar proveedores"
                  }
                  onInputChange={(_, value) => {
                    setProveedorSearch(value);
                  }}
                  onChange={(_, proveedor) => {
                    setSelectedProveedor(proveedor);
                  }}
                  renderOption={(props, proveedor) => (
                    <li {...props} key={proveedor.id}>
                      {proveedor.razonSocial}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Proveedor"
                      placeholder="Busca por razón social o número de identificación"
                    />
                  )}
                />
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                    gap: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    label="Descuento total"
                    type="number"
                    value={descuentoTotal}
                    onChange={(event) => setDescuentoTotal(event.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Detalle"
                    value={detalle}
                    onChange={(event) => setDetalle(event.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Observaciones"
                    value={observaciones}
                    onChange={(event) => setObservaciones(event.target.value)}
                    multiline
                    minRows={2}
                    sx={{ gridColumn: { sm: "1 / -1" } }}
                  />
                </Box>
              </Stack>
            </Paper>
            <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
              <Stack spacing={2}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.5}
                  alignItems={{ xs: "stretch", sm: "center" }}
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="h6" component="h3" fontWeight={600}>
                      Productos de la compra
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Almacén destino: {almacenId}
                    </Typography>
                  </Box>
                  <Button
                    onClick={() =>
                      setDetalleCompra((current) => [
                        ...current,
                        makeEmptyDetalle(nextKey.current++),
                      ])
                    }
                    type="button"
                    startIcon={<AddIcon />}
                    variant="outlined"
                  >
                    Agregar producto
                  </Button>
                </Stack>
                <Stack spacing={2}>
                  {detalleCompra.map((item) => (
                    <CompraDetalleRow
                      key={item.key}
                      almacenId={Number(almacenId)}
                      value={item}
                      canRemove={detalleCompra.length > 1}
                      onChange={(changes) => {
                        setDetalleCompra((current) =>
                          current.map((detailItem) =>
                            detailItem.key === item.key
                              ? { ...detailItem, ...changes }
                              : detailItem,
                          ),
                        );
                      }}
                      onRemove={() =>
                        setDetalleCompra((current) =>
                          current.length > 1
                            ? current.filter(
                                (detailItem) => detailItem.key !== item.key,
                              )
                            : current,
                        )
                      }
                    />
                  ))}
                </Stack>
              </Stack>
            </Paper>
            <Stack
              direction={{ xs: "column-reverse", sm: "row" }}
              spacing={1.5}
              justifyContent="flex-end"
            >
              <Button onClick={onCancel} disabled={loading}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar compra'}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}

export default ComprasForm;