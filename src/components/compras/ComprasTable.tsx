import {
    Alert,
    Chip,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import type { ComprasResponse } from "../../types/compras/ComprasResponse";

interface ComprasTableProps {
    compras: ComprasResponse[];
    loading: boolean;
    error?: string;
    reportingId: number | null;
    anulandoId: number | null;
    onView: (compra: ComprasResponse) => void;
    onGetReport: (compra: ComprasResponse) => void;
    onAnular: (compra: ComprasResponse) => void;
}

const columns = ["Código", "Fecha", "Proveedor", "Usuario", "Estado", "Acciones"];

function formatDate(value: string) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function ComprasTable({
    compras,
    loading,
    error,
    reportingId,
    anulandoId,
    onView,
    onGetReport,
    onAnular,
}: ComprasTableProps) {
    return (
        <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid", borderRadius: 3, overflowX: "auto" }}>
            <Table sx={{ minWidth: 850 }}>
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
                            <TableCell colSpan={columns.length} align="center">Cargando compras...</TableCell>
                        </TableRow>
                    )}
                    {!loading && error && (
                        <TableRow>
                            <TableCell colSpan={columns.length}><Alert severity="error">{error}</Alert></TableCell>
                        </TableRow>
                    )}
                    {!loading && !error && compras.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={columns.length} align="center">No hay compras registradas</TableCell>
                        </TableRow>
                    )}
                    {!loading && !error && compras.map((compra) => (
                        <TableRow key={compra.id} hover>
                            <TableCell>{compra.codigo}</TableCell>
                            <TableCell>{formatDate(compra.fecha)}</TableCell>
                            <TableCell>{compra.proveedorRazonSocial}</TableCell>
                            <TableCell>{compra.username}</TableCell>
                            <TableCell><Chip size="small" label={compra.estado} /></TableCell>
                            <TableCell>
                                <Tooltip title="Ver detalle">
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        aria-label={`Ver detalle de la compra ${compra.codigo}`}
                                        onClick={() => onView(compra)}
                                    >
                                        <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Generar reporte">
                                    <span>
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            aria-label={`Generar reporte de la compra ${compra.codigo}`}
                                            disabled={reportingId !== null}
                                            onClick={() => onGetReport(compra)}
                                        >
                                            <PictureAsPdfOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                                <Tooltip title="Anular compra">
                                    <IconButton
                                        size="small"
                                        color="error"
                                        aria-label={`Anular compra ${compra.codigo}`}
                                        disabled={anulandoId === compra.id}
                                        onClick={() => onAnular(compra)}
                                    >
                                        <BlockOutlinedIcon fontSize="small" />
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

export default ComprasTable;