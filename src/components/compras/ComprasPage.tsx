
import { useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
} from "@mui/material";
import { useAnularCompra, useCompras } from "../../hooks/useCompras";
import { comprasService } from "../../services/compras/ComprasService";
import type { ComprasResponse } from "../../types/compras/ComprasResponse";
import ComprasDetailDialog from "./ComprasDetailDialog";
import ComprasTable from "./ComprasTable";

function ComprasPage() {
    const { data: compras, isLoading, error, refetch } = useCompras();
    const anularMutation = useAnularCompra();
    const [detailCompraId, setDetailCompraId] = useState<number | null>(null);
    const [anularTarget, setAnularTarget] = useState<ComprasResponse | null>(null);
    const [reportTarget, setReportTarget] = useState<ComprasResponse | null>(null);
    const [reportUrl, setReportUrl] = useState<string | null>(null);
    const [reportLoading, setReportLoading] = useState(false);
    const [reportError, setReportError] = useState<string | null>(null);

    useEffect(() => {
        if (!reportUrl) return;
        return () => URL.revokeObjectURL(reportUrl);
    }, [reportUrl]);

    const handleGetReport = async (compra: ComprasResponse) => {
        setReportTarget(compra);
        setReportUrl(null);
        setReportError(null);
        setReportLoading(true);
        try {
            const report = await comprasService.generateReport(compra.id);
            setReportUrl(URL.createObjectURL(report));
        } catch (error) {
            setReportError(
                error instanceof Error ? error.message : "No se pudo generar el reporte de compra",
            );
        } finally {
            setReportLoading(false);
        }
    };

    const closeReport = () => {
        setReportTarget(null);
        setReportUrl(null);
        setReportError(null);
    };

    const handleConfirmAnular = () => {
        if (!anularTarget) return;
        anularMutation.mutate(anularTarget.id, {
            onSuccess: () => setAnularTarget(null),
        });
    };

    return (
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{
                    mb: 3,
                    alignItems: { xs: "stretch", sm: "center" },
                    justifyContent: "space-between",
                }}
            >
                <Box>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                        Compras
                    </Typography>
                    <Typography color="text.secondary">
                        Consulta las compras, revisa su detalle o genera sus reportes.
                    </Typography>
                </Box>
                <Button variant="outlined" onClick={() => void refetch()}>
                    Actualizar datos
                </Button>
            </Stack>

            <ComprasTable
                compras={compras ?? []}
                loading={isLoading}
                error={error?.message}
                reportingId={reportLoading ? reportTarget?.id ?? null : null}
                anulandoId={anularMutation.isPending ? anularTarget?.id ?? null : null}
                onView={(compra) => setDetailCompraId(compra.id)}
                onGetReport={(compra) => void handleGetReport(compra)}
                onAnular={(compra) => {
                    anularMutation.reset();
                    setAnularTarget(compra);
                }}
            />

            <ComprasDetailDialog
                compraId={detailCompraId}
                onClose={() => setDetailCompraId(null)}
            />

            <Dialog
                open={anularTarget !== null}
                onClose={() => !anularMutation.isPending && setAnularTarget(null)}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>Anular compra</DialogTitle>
                <DialogContent>
                    <Typography>
                        ¿Confirmas que deseas anular la compra{" "}
                        <strong>{anularTarget?.codigo}</strong>? Esta acción actualizará el estado de la compra.
                    </Typography>
                    {anularMutation.error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {anularMutation.error.message}
                        </Alert>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setAnularTarget(null)}
                        disabled={anularMutation.isPending}
                    >
                        Cancelar
                    </Button>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={handleConfirmAnular}
                        disabled={anularMutation.isPending}
                    >
                        {anularMutation.isPending ? "Anulando..." : "Anular compra"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={reportTarget !== null}
                onClose={() => !reportLoading && closeReport()}
                fullWidth
                maxWidth="lg"
            >
                <DialogTitle>Reporte de compra {reportTarget?.codigo}</DialogTitle>
                <DialogContent>
                    {reportLoading && <Typography sx={{ py: 2 }}>Generando reporte...</Typography>}
                    {reportError && (
                        <Alert
                            severity="error"
                            action={
                                reportTarget && (
                                    <Button
                                        size="small"
                                        onClick={() => void handleGetReport(reportTarget)}
                                    >
                                        Reintentar
                                    </Button>
                                )
                            }
                        >
                            {reportError}
                        </Alert>
                    )}
                    {reportUrl && (
                        <Box
                            component="iframe"
                            src={reportUrl}
                            title={`Reporte de compra ${reportTarget?.codigo}`}
                            sx={{ border: 0, width: "100%", height: "70vh", mt: 1 }}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    {reportUrl && reportTarget && (
                        <Button
                            component="a"
                            href={reportUrl}
                            download={`compra_${reportTarget.codigo}_report.pdf`}
                        >
                            Descargar PDF
                        </Button>
                    )}
                    <Button onClick={closeReport} disabled={reportLoading}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default ComprasPage;