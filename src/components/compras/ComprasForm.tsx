import { useAuthStore } from "../../state-management/authStore";
import { useProveedores } from "../../hooks/useProveedores";
import { useRef, useState } from "react";
import type { ProveedorResponse } from "../../types/proveedores/ProveedorResponse";
import type { CompraDetalleFormValue } from "./CompraDetalleRow";
import { Alert, Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
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
}
function ComprasForm({almacenId, loading, error, onSubmit}: CompraFormProps) {
  
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

  const resetForm = () => {
    setSelectedProveedor(null);
    setProveedorSearch("");
    setDescuentoTotal("");
    setDetalle("");
    nextKey.current = 1;
    setObservaciones("");
    setDetalleCompra([makeEmptyDetalle(0)]);
  };

  const closeForm = () => {
    resetForm();
  };

  const handleSubmit = (event) => {
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
    <>
      <h1>Registro de Compra</h1>
      <form onSubmit={handleSubmit}>
        <Stack>
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
                <label>{proveedor.razonSocial}</label>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar proveedor"
                placeholder="Busca por razonSocial o nro identificacion"
              />
            )}
            sx={{ mt: 0.5 }}
          />
          <Box>
            <TextField
              label="DescuentoTotal"
              type="number"
              value={descuentoTotal}
              onChange={(event) => setDescuentoTotal(event.target.value)}
            />
            <TextField
              label="Detalle"
              value={detalle}
              onChange={(event) => setDetalle(event.target.value)}
            />
          </Box>
          <TextField
            label="Observaciones"
            value={observaciones}
            onChange={(event) => setObservaciones(event.target.value)}
          />
        </Stack>
        <Stack>
          <Stack>
            <label>Detalle de compra</label>
            <Button
              onClick={() =>
                setDetalleCompra((current) => [
                  ...current,
                  makeEmptyDetalle(nextKey.current++),
                ])
              }
              type="button"
              startIcon={<AddIcon/>}
            >
              Agregar producto
            </Button>
          </Stack>
          <label>Almacen destino: {almacenId}</label>
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
        <div>
            <Button onClick={()=>closeForm()}>Cancelar</Button>
            <Button type="submit" variant="outlined" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar compra'}
            </Button>
        </div>
      </form>
    </>
  );
}

export default ComprasForm;