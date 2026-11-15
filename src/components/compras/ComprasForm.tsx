import { useNavigate, useParams } from "react-router";
import { useAlmacenes } from "../../hooks/useAlmacenes";
import { useAuthStore } from "../../state-management/authStore";
import { useProveedores } from "../../hooks/useProveedores";
import { useState } from "react";
import type { ProveedorResponse } from "../../types/proveedores/ProveedorResponse";
import type { CompraDetalleFormValue } from "./CompraDetalleRow";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import CompraDetalleRow from "./CompraDetalleRow";

function makeEmptyDetalle(key:number): CompraDetalleFormValue {
    return {
        key,
        productoId: null,
        cantidad: "1",
        precioUnitarioCompra: "",
        observaciones: ""
    }
}

function ComprasForm() {
    const { almacenId: routeAlmacenId} = useParams<{almacenId: string}>();
    const navigate = useNavigate();
    const { data: almacenes, isLoading: almacenesError, error: errorAlmacenes} = useAlmacenes();
    const usuarioId = useAuthStore((state)=> state.identifier);
    const { data: proveedores, isLoading: isLoadingProveedores, isError: proveedoresError, error: errorProveedores} = useProveedores();
    const [selectedProveedor, setSelectedProveedor] = useState<ProveedorResponse | null>(null);
    const [proveedorSearch, setProveedorSearch] = useState("");
    const [descuentoTotal, setDescuentoTotal] = useState("");
    const [detalle, setDetalle] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [detalleCompra, setDetalleCompra] = useState<CompraDetalleFormValue[]>([makeEmptyDetalle(0)]);
    return (
        <>
            <h1>Registro de Compra</h1>
            <form>
                <Stack>
                    <Autocomplete />
                    <Box>
                        <TextField label="DescuentoTotal"/>
                        <TextField label="Detalle"/>
                    </Box>
                    <TextField label="Observaciones"/>
                </Stack>
                <Stack>
                    <Stack>
                        <label>Detalle de compra</label>
                        <Button >Agregar producto</Button>
                    </Stack>
                    {detalleCompra.map((item)=>(
                        <CompraDetalleRow
                          key={item.key}
                          almacenId={Number(routeAlmacenId)}  
                          value={item}
                          canRemove={detalleCompra.length > 1}
                          onChange={(changes)=>{
                            setDetalleCompra((current) => 
                                current.map((detailItem) => 
                                    detailItem.key === item.key ? {...detailItem, ...changes} : detailItem
                                )
                            )
                          }} 
                          onRemove={() => setDetalleCompra((current) => 
                            current.length > 1 ? current.filter((detailItem) => detailItem.key !== item.key) : current
                          )}               
                        />
                    ))}
                </Stack>
            </form>
        </>
    )
}

export default ComprasForm;