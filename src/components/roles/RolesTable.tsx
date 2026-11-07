import { useState } from "react";
import type { RolesResponse } from "../../types/roles/RolesResponse";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Alert from "@mui/material/Alert";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface RolesTableProps {
    roles: RolesResponse[];
    loading?: boolean;
    error?: string | null;
    deletingId: number | null;
    onView?: (role: RolesResponse) => void;
    onEdit?: (role: RolesResponse) => void;
    onDelete?: (role: RolesResponse) => void;
}
function RolesTable({
  roles,
  loading,
  error,
  deletingId,
  onView,
  onEdit,
  onDelete,
}: RolesTableProps) {
  const [columns] = useState([
    "ID",
    "Nombre",
    "Descripcion",
    "Permisos",
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
                <p>Cargando roles...</p>
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
          {!loading && !error && roles.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <p>No hay roles registrados</p>
              </TableCell>
            </TableRow>
          )}
          {!loading &&
            !error &&
            roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.id}</TableCell>
                <TableCell>{role.nombre}</TableCell>
                <TableCell>{role.descripcion}</TableCell>
                <TableCell>
                    {role.permisosIds?.join(', ')}
                </TableCell>
                <TableCell>
                    <Tooltip title='Ver Detalle'>
                        <IconButton size="small" color="primary" onClick={()=>onView?.(role)}>
                            <VisibilityIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Editar'>
                        <IconButton size="small" color="primary" onClick={()=>onEdit?.(role)}>
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Eliminar'>
                        <IconButton size="small" color="primary" 
                            disabled={deletingId === role.id}
                            onClick={()=>onDelete?.(role)}>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RolesTable;
