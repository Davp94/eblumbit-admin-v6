import { Alert, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import type { ProductoResponse } from "../../types/productos/ProductoResponse";

interface InventoryTableProps {
    productos: ProductoResponse[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    loading: boolean;
    error?: string;
    onPageChange: (pageNumber: number) => void;
    onPageSizeChange: (pageSize: number) => void;
}

const columns = [
    'ID',
    'Producto',
    'Codigo Barras',
    'Categoria',
    'Marca',
    'Precio de venta'
];

function InventoryTable({
    productos,
    totalCount,
    pageNumber,
    pageSize,
    loading, 
    error,
    onPageChange,
    onPageSizeChange
}: InventoryTableProps) {
    return (
        <Paper elevation={0} sx={{border: '1px solid', borderRadius: 3 , overflow: 'hidden'}} >
            <TableContainer sx={{overflowX: 'auto'}}>
                <Table sx={{minWidth: 1000}}>
                    <TableHead>
                        <TableRow>
                            {columns.map((column)=>(
                                <TableCell key={column} sx={{fontWeight: 700}}>
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    <CircularProgress size={30}/>
                                </TableCell>
                            </TableRow>
                        )}
                        {!loading && error && (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    <Alert severity="error">{error}</Alert>
                                </TableCell>
                            </TableRow>
                        )}
                        {!loading && !error && productos.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    No hay productos registrados
                                </TableCell>
                            </TableRow>
                        )}
                        {!loading && !error && productos.map((producto) => (
                            <TableRow key={producto.id}>
                                <TableCell>{producto.id}</TableCell>
                                <TableCell>{producto.nombre}</TableCell>
                                <TableCell>{producto.codigoBarra}</TableCell>
                                <TableCell>{producto.categoriaNombre}</TableCell>
                                <TableCell>{producto.marca}</TableCell>
                                <TableCell>{producto.precioVentaActual}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={totalCount}
                page={pageNumber-1}
                rowsPerPage={pageSize}
                rowsPerPageOptions={[5,10,25,50]}
                labelRowsPerPage="Filas por página:"
                labelDisplayedRows={({from, to, count }) => 
                    `${from}-${to} de ${count}`
                }
                onPageChange={(_, page)=> onPageChange(page+1)}
                onRowsPerPageChange={(event)=>onPageSizeChange(Number(event.target.value))}
            />
        </Paper>
    )
}

export default InventoryTable;