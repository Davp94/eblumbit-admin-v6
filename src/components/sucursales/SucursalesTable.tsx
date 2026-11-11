import { Alert, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { SucursalResponse } from "../../types/sucursales/SucursalResponse";

interface SucursalesTableProps {
    sucursales: SucursalResponse[];
    loading: boolean;
    error?: string;
    deletingId: number | null;
    onView: (sucursal: SucursalResponse) => void;
    onEdit: (sucursal: SucursalResponse) => void;
    onDelete: (sucursal: SucursalResponse) => void;
}

const columns = ["ID", "Nombre", "Dirección", "Teléfono", "Ciudad", "Acciones"];

function SucursalesTable({ sucursales, loading, error, deletingId, onView, onEdit, onDelete }: SucursalesTableProps) {
    return (
        <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid", borderRadius: 3, overflowX: "auto" }}>
            <Table sx={{ minWidth: 850 }}>
                <TableHead>
                    <TableRow>{columns.map((column) => <TableCell key={column} sx={{ fontWeight: 700 }}>{column}</TableCell>)}</TableRow>
                </TableHead>
                <TableBody>
                    {loading && <TableRow><TableCell colSpan={columns.length} align="center">Cargando sucursales...</TableCell></TableRow>}
                    {!loading && error && <TableRow><TableCell colSpan={columns.length}><Alert severity="error">{error}</Alert></TableCell></TableRow>}
                    {!loading && !error && sucursales.length === 0 && <TableRow><TableCell colSpan={columns.length} align="center">No hay sucursales registradas</TableCell></TableRow>}
                    {!loading && !error && sucursales.map((sucursal) => (
                        <TableRow key={sucursal.id}>
                            <TableCell>{sucursal.id}</TableCell>
                            <TableCell>{sucursal.nombre}</TableCell>
                            <TableCell>{sucursal.direccion}</TableCell>
                            <TableCell>{sucursal.telefono}</TableCell>
                            <TableCell>{sucursal.ciudad}</TableCell>
                            <TableCell>
                                <Tooltip title="Ver detalle"><IconButton size="small" color="primary" onClick={() => onView(sucursal)}><VisibilityIcon fontSize="small" /></IconButton></Tooltip>
                                <Tooltip title="Editar"><IconButton size="small" color="primary" onClick={() => onEdit(sucursal)}><EditIcon fontSize="small" /></IconButton></Tooltip>
                                <Tooltip title="Eliminar"><IconButton size="small" color="primary" disabled={deletingId === sucursal.id} onClick={() => onDelete(sucursal)}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default SucursalesTable;
