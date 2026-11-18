import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useCompraById } from "../../hooks/useCompras";

interface ComprasDetailDialogProps {
    compraId: number | null;
    onClose: () => void;
}

const formatNumber = (value: number) =>
    new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value);

function ComprasDetailDialog({ compraId, onClose }: ComprasDetailDialogProps) {
    const { data: compra, isLoading, isError, error } = useCompraById(compraId);
    const detalles = compra?.detalleCompra ?? [];

    return (
        <Dialog open={compraId !== null} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle>
                Detalle de compra{compra ? ` ${compra.codigo}` : ""}
            </DialogTitle>
            <DialogContent dividers>
                {isLoading && <Typography>Cargando detalle de compra...</Typography>}
                {isError && <Alert severity="error">{error.message}</Alert>}
                {!isLoading && !isError && compra && (
                    <Stack spacing={3}>
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                                gap: 2,
                            }}
                        >
                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="subtitle2" color="text.secondary">Compra</Typography>
                                <Typography><strong>Código:</strong> {compra.codigo}</Typography>
                                <Typography><strong>Fecha:</strong> {compra.fecha}</Typography>
                                <Typography><strong>Estado:</strong> {compra.estado}</Typography>
                                <Typography><strong>Descuento total:</strong> {formatNumber(compra.descuentoTotal)}</Typography>
                            </Paper>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="subtitle2" color="text.secondary">Proveedor y usuario</Typography>
                                <Typography><strong>Proveedor:</strong> {compra.proveedorRazonSocial}</Typography>
                                <Typography><strong>Identificación:</strong> {compra.proveedorNroIdentificacion}</Typography>
                                <Typography><strong>Usuario:</strong> {compra.username}</Typography>
                            </Paper>
                            <Paper variant="outlined" sx={{ p: 2, gridColumn: { sm: "1 / -1" } }}>
                                <Typography variant="subtitle2" color="text.secondary">Notas</Typography>
                                <Typography><strong>Detalle:</strong> {compra.detalle || "—"}</Typography>
                                <Typography><strong>Observaciones:</strong> {compra.observaciones || "—"}</Typography>
                            </Paper>
                        </Box>

                        <Box>
                            <Typography variant="h6" component="h3" sx={{ mb: 1.5 }}>
                                Productos ({detalles.length})
                            </Typography>
                            {detalles.length === 0 ? (
                                <Alert severity="info">Esta compra no tiene productos detallados.</Alert>
                            ) : (
                                <TableContainer component={Paper} variant="outlined" sx={{ overflowX: "auto" }}>
                                    <Table size="small" sx={{ minWidth: 850 }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 700 }}>Producto</TableCell>
                                                <TableCell sx={{ fontWeight: 700 }}>Almacén</TableCell>
                                                <TableCell align="right" sx={{ fontWeight: 700 }}>Cantidad</TableCell>
                                                <TableCell align="right" sx={{ fontWeight: 700 }}>Precio unitario</TableCell>
                                                <TableCell align="right" sx={{ fontWeight: 700 }}>Subtotal</TableCell>
                                                <TableCell sx={{ fontWeight: 700 }}>Observaciones</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {detalles.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell>
                                                        {item.productoNombre}
                                                        <Typography variant="caption" display="block" color="text.secondary">
                                                            ID: {item.productoId}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.almacenNombre}
                                                        <Typography variant="caption" display="block" color="text.secondary">
                                                            ID: {item.almacenId}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="right">{formatNumber(item.cantidad)}</TableCell>
                                                    <TableCell align="right">{formatNumber(item.precioUnitarioCompra)}</TableCell>
                                                    <TableCell align="right">
                                                        {formatNumber(item.cantidad * item.precioUnitarioCompra)}
                                                    </TableCell>
                                                    <TableCell>{item.observaciones || "—"}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </Box>
                    </Stack>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ComprasDetailDialog;
