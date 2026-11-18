import { useNavigate, useParams } from "react-router";
import { useAlmacenes } from "../../hooks/useAlmacenes";
import { useCreateCompra } from "../../hooks/useCompras";
import { useEffect, useState } from "react";
import { comprasService } from "../../services/compras/ComprasService";
import type { ComprasResponse } from "../../types/compras/ComprasResponse";
import { Alert, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack, Typography } from "@mui/material";
import ComprasForm from "./ComprasForm";

function ComprasFormPage() {
    const { almacenId: routeAlmacenId } = useParams<{ almacenId: string }>();
    const navigate = useNavigate();
    const { data: almacenes, isLoading, isError, error} = useAlmacenes();
    const createCompra = useCreateCompra();
    const [savedCompraId, setSavedCompraId] = useState<number | null>(null);
    const [reportUrl, setReportUrl] = useState<string | null>(null);
    const [reportLoading, setReportLoading] = useState(false);
    const [reportError, setReportError] = useState<string | null>(null);
    const almacen = almacenes?.find((item) => item.id === Number(routeAlmacenId));

    useEffect(() => {
        if(!reportUrl) return;
        return () => URL.revokeObjectURL(reportUrl);
    }, [reportUrl])

    const generateCompraReport = async (compraId: number) => {
        setReportLoading(true);
        setReportError(null);
        setReportUrl(null);
        try {
            const report = await comprasService.generateReport(compraId);
            setReportUrl(URL.createObjectURL(report));
        } catch (error) {
            setReportError(
                error instanceof Error 
                ? error.message
                : 'No se pudo generar el reporte de compra'
            )
        } finally {
            setReportLoading(false);
        }
    }

    const handleCreateSuccess = async (compra: ComprasResponse) => {
        setSavedCompraId(compra.id);
        await generateCompraReport(compra.id);
    }

    if(!Number.isInteger(Number(routeAlmacenId)) || Number(routeAlmacenId) <= 0) {
        return (
            <Box>
                <Alert severity="error">No se recibio un almacen valido para la compra</Alert>
                <Button onClick={()=>navigate('/dashboard/inventario')}>Volver al inventario</Button>
            </Box>
        )
    }

    if(isLoading) {
        return <Box sx={{p:3}}>Cargando almacenes...</Box>
    }

    if(isError) {
        return (
            <Box sx={{p:3}}>
                <Alert severity="error">No se pudieron cargar los alamcenes: {error.message}</Alert>
                <Button onClick={()=>navigate('/dashboard/inventario')}>Volver al inventario</Button>
            </Box>
        )
    }

    return (
        <>
            <Box sx={{ maxWidth: 1100, mx: "auto", p: { xs: 2, sm: 3 } }}>
                <Paper variant="outlined" sx={{ overflow: "hidden", borderRadius: 3 }}>
                    <Box
                        sx={{
                            px: { xs: 2.5, sm: 4 },
                            py: { xs: 3, sm: 4 },
                            bgcolor: "primary.main",
                            color: "primary.contrastText",
                        }}
                    >
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}
                            alignItems={{ xs: "flex-start", sm: "center" }}
                            justifyContent="space-between"
                        >
                            <Box>
                                <Typography variant="overline" sx={{ opacity: 0.8, letterSpacing: 1.2 }}>
                                    COMPRAS
                                </Typography>
                                <Typography variant="h4" component="h1" fontWeight={700}>
                                    Registrar compra
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 0.5, opacity: 0.9 }}>
                                    Registra al proveedor y los productos que ingresan al almacén.
                                </Typography>
                            </Box>
                            <Stack spacing={0.75} alignItems={{ xs: "flex-start", sm: "flex-end" }}>
                                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                                    ALMACÉN DE DESTINO
                                </Typography>
                                <Chip
                                    label={almacen?.nombre ?? `Almacén #${routeAlmacenId}`}
                                    sx={{
                                        color: "inherit",
                                        bgcolor: "rgba(255,255,255,0.16)",
                                        fontWeight: 600,
                                        maxWidth: "100%",
                                    }}
                                />
                            </Stack>
                        </Stack>
                    </Box>
                    <Stack spacing={3} sx={{ p: { xs: 2, sm: 4 } }}>
                        {savedCompraId === null ? (
                            <ComprasForm
                                almacenId={almacen ? almacen.id : 0}
                                loading={createCompra.isPending}
                                error={createCompra.error?.message ?? null}
                                onSubmit={(request)=>createCompra.mutate(request, {onSuccess: handleCreateSuccess})}
                                onCancel={()=>navigate('/dashboar/inventario')}
                            />
                        ) : (
                            <Alert severity="success">
                                Compra #{savedCompraId} guardada. El reporte se esta preparando.
                            </Alert>
                        )}
                    </Stack>
                </Paper>
                <Dialog
                    open={savedCompraId !== null}
                    onClose={()=>navigate('/dashboard/compras')}
                    fullWidth
                >
                    <DialogTitle>Reporte de compra #{savedCompraId}</DialogTitle>
                    <DialogContent>
                        {reportLoading && (
                            <Stack>
                                Generando reporte....
                            </Stack>
                        )}
                        {reportError && (
                            <Alert 
                            severity="error" 
                            action={
                                savedCompraId !== null && (
                                    <Button size="small" onClick={() => generateCompraReport(savedCompraId)}>
                                        Reintentar
                                    </Button>
                                )
                            }>
                                {reportError}
                            </Alert>
                        )}
                        {reportUrl && (
                            <Box
                            component="iframe"
                            src={reportUrl}
                            title={`Reporte de compra ${savedCompraId}`}
                            sx={{border: 0, width: '100%', height: '70vh'}}
                            ></Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        {reportUrl && savedCompraId != null && (
                            <Button
                                component="a"
                                href={reportUrl}
                                download={`compra_${savedCompraId}_report.pdf`}
                            >
                                DescargarPDF
                            </Button>
                        )}
                        <Button onClick={() => navigate('/dashboard/inventario')}>Finalizar</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    )
}

export default ComprasFormPage;