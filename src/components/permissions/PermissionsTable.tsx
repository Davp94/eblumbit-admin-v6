import { useState } from "react";
import type { PermissionResponse } from "../../types/permissions/PermissionResponse";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Alert from "@mui/material/Alert";
import { IconButton, TablePagination, Tooltip } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface PermissionsTableProps {
    permissions: PermissionResponse[];
    loading?: boolean;
    error?: string | null;
    deletingId: number | null;
    onView?: (permission: PermissionResponse) => void;
    onEdit?: (permission: PermissionResponse) => void;
    onDelete?: (permission: PermissionResponse) => void;
}
function PermissionsTable({
  permissions,
  loading,
  error,
  deletingId,
  onView,
  onEdit,
  onDelete,
}: PermissionsTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const pageCount = Math.min(1, Math.ceil(permissions.length / rowsPerPage));
  const currentPage = Math.min(page, pageCount -1);
  const [columns] = useState([
    "ID",
    "Nombre",
    "Detalle",
    "Descripcion",
    "Subject",
    "Action",
    "Acciones",
  ]);

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: "1px solid",
        borderRadius: 3,
        overflowX: "auto",
      }}
    >
      <Table sx={{ minWidth: 1200 }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column} sx={{ fontWeight: 700 }}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <p>Cargando permisos...</p>
              </TableCell>
            </TableRow>
          )}
          {!loading && error && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Alert severity="error">{error}</Alert>
              </TableCell>
            </TableRow>
          )}
          {!loading && !error && permissions.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <p>No hay permisos registrados</p>
              </TableCell>
            </TableRow>
          )}
          {!loading &&
            !error &&
            permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell>{permission.id}</TableCell>
                <TableCell>{permission.nombre}</TableCell>
                <TableCell>{permission.detalle}</TableCell>
                <TableCell>{permission.descripcion}</TableCell>
                <TableCell>{permission.subject}</TableCell>
                <TableCell>{permission.action}</TableCell>
                <TableCell>
                    <Tooltip title='Ver Detalle'>
                        <IconButton size="small" color="primary" onClick={()=>onView?.(permission)}>
                            <VisibilityIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Editar'>
                        <IconButton size="small" color="primary" onClick={()=>onEdit?.(permission)}>
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Eliminar'>
                        <IconButton size="small" color="primary" 
                            disabled={deletingId === permission.id}
                            onClick={()=>onDelete?.(permission)}>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={permissions.length}
        page={currentPage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5,25,50]}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({from, to, count }) => 
            `${from}-${to} de ${count}`
        }
        onPageChange={(_, page)=> setPage(page+1)}
        onRowsPerPageChange={(event)=>setRowsPerPage(Number(event.target.value))}
      />
    </TableContainer>
  );
}

export default PermissionsTable;
