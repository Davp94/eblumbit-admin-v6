import { Alert, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { ProveedorResponse } from "../../types/proveedores/ProveedorResponse";

interface ProveedoresTableProps {
    proveedores: ProveedorResponse[];
    loading: boolean;
    error?: string;
    deletingId: number | null;
    onView: (proveedor: ProveedorResponse) => void;
    onEdit: (proveedor: ProveedorResponse) => void;
    onDelete: (proveedor: ProveedorResponse) => void;
}

const columns = ["ID", "Razón social", "Identificación", "Contacto", "Teléfono", "Correo", "Estado", "Acciones"];

function ProveedoresTable({ proveedores, loading, error, deletingId, onView, onEdit, onDelete }: ProveedoresTableProps) {
    return (
        <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid", borderRadius: 3, overflowX: "auto" }}>
            <Table sx={{ minWidth: 1100 }}>
                <TableHead>
                    <TableRow>{columns.map((column) => <TableCell key={column} sx={{ fontWeight: 700 }}>{column}</TableCell>)}</TableRow>
                </TableHead>
                <TableBody>
                    {loading && <TableRow><TableCell colSpan={columns.length} align="center">Cargando proveedores...</TableCell></TableRow>}
                    {!loading && error && <TableRow><TableCell colSpan={columns.length}><Alert severity="error">{error}</Alert></TableCell></TableRow>}
                    {!loading && !error && proveedores.length === 0 && <TableRow><TableCell colSpan={columns.length} align="center">No hay proveedores registrados</TableCell></TableRow>}
                    {!loading && !error && proveedores.map((proveedor) => (
                        <TableRow key={proveedor.id}>
                            <TableCell>{proveedor.id}</TableCell>
                            <TableCell>{proveedor.razonSocial}</TableCell>
                            <TableCell>{proveedor.nroIdentificacion}</TableCell>
                            <TableCell>{proveedor.contacto}</TableCell>
                            <TableCell>{proveedor.telefono}</TableCell>
                            <TableCell>{proveedor.correo}</TableCell>
                            <TableCell>{proveedor.estado === null ? "Sin estado" : proveedor.estado ? "Activo" : "Inactivo"}</TableCell>
                            <TableCell>
                                <Tooltip title="Ver detalle"><IconButton size="small" color="primary" onClick={() => onView(proveedor)}><VisibilityIcon fontSize="small" /></IconButton></Tooltip>
                                <Tooltip title="Editar"><IconButton size="small" color="primary" onClick={() => onEdit(proveedor)}><EditIcon fontSize="small" /></IconButton></Tooltip>
                                <Tooltip title="Eliminar"><IconButton size="small" color="primary" disabled={deletingId === proveedor.id} onClick={() => onDelete(proveedor)}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ProveedoresTable;
