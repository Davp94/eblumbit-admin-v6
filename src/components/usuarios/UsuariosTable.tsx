import { useState } from "react";
import type { UsuariosResponse } from "../../types/usuarios/UsuariosResponse";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Alert from "@mui/material/Alert";

interface UsuariosTableProps {
    usuarios: UsuariosResponse[];
    loading?: boolean;
    error?: string | null;
}
function UsuariosTable({usuarios, loading, error}: UsuariosTableProps) {

    const [columns] = useState(['ID', 'Nombres', 'Apellido', 'Correo', 'Username']);

    return (
        <TableContainer
            component={Paper}
            elevation={0}
            sx={{
                border: '1px solid',
                borderRadius: 3,
                overflowX: 'auto'
            }}
        >
            <Table sx={{minWidth: 900}}>
                <TableHead>
                    <TableRow>
                        {columns.map((column)=>(
                        <TableCell
                            key={column}
                            sx={{fontWeight: 700}}
                        >
                            {column}
                        </TableCell>
                        ))}
                    </TableRow>

                </TableHead>
                <TableBody>
                    {loading && (
                        <TableRow>
                            <TableCell colSpan={columns.length} align="center">
                                <p>Cargando usuarios...</p>
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
                    {!loading && !error && usuarios.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={columns.length} align="center">
                                <p>No hay usuarios registrados</p>
                            </TableCell>
                        </TableRow>
                    )}
                    {!loading && !error && usuarios.map((usuario) => (
                        <TableRow key={usuario.id}>
                            <TableCell>{usuario.id}</TableCell>
                            <TableCell>{usuario.nombres}</TableCell>
                            <TableCell>{usuario.apellidos}</TableCell>
                            <TableCell>{usuario.correo}</TableCell>
                            <TableCell>{usuario.username}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </TableContainer>
    );
}

export default UsuariosTable;