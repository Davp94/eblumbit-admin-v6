import { Alert, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { AlmacenResponse } from "../../types/almacenes/AlmacenResponse";

interface AlmacenesTableProps {
    almacenes: AlmacenResponse[];
    loading: boolean;
    error?: string;
    deletingId: number | null;
    onView: (almacen: AlmacenResponse) => void;
    onEdit: (almacen: AlmacenResponse) => void;
    onDelete: (almacen: AlmacenResponse) => void;
}

const columns = ["ID", "Código", "Nombre", "Descripción", "Sucursal", "Acciones"];

function AlmacenesTable({ almacenes, loading, error, deletingId, onView, onEdit, onDelete }: AlmacenesTableProps) {
    return (
        <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid", borderRadius: 3, overflowX: "auto" }}>
            <Table sx={{ minWidth: 950 }}>
                <TableHead>
                    <TableRow>{columns.map((column) => <TableCell key={column} sx={{ fontWeight: 700 }}>{column}</TableCell>)}</TableRow>
                </TableHead>
                <TableBody>
                    {loading && <TableRow><TableCell colSpan={columns.length} align="center">Cargando almacenes...</TableCell></TableRow>}
                    {!loading && error && <TableRow><TableCell colSpan={columns.length}><Alert severity="error">{error}</Alert></TableCell></TableRow>}
                    {!loading && !error && almacenes.length === 0 && <TableRow><TableCell colSpan={columns.length} align="center">No hay almacenes registrados</TableCell></TableRow>}
                    {!loading && !error && almacenes.map((almacen) => (
                        <TableRow key={almacen.id}>
                            <TableCell>{almacen.id}</TableCell>
                            <TableCell>{almacen.codigo}</TableCell>
                            <TableCell>{almacen.nombre}</TableCell>
                            <TableCell>{almacen.descripcion}</TableCell>
                            <TableCell>{almacen.sucursalNombre}</TableCell>
                            <TableCell>
                                <Tooltip title="Ver detalle"><IconButton size="small" color="primary" onClick={() => onView(almacen)}><VisibilityIcon fontSize="small" /></IconButton></Tooltip>
                                <Tooltip title="Editar"><IconButton size="small" color="primary" onClick={() => onEdit(almacen)}><EditIcon fontSize="small" /></IconButton></Tooltip>
                                <Tooltip title="Eliminar"><IconButton size="small" color="primary" disabled={deletingId === almacen.id} onClick={() => onDelete(almacen)}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AlmacenesTable;
