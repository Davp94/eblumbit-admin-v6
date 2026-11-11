import { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { useCreateSucursal, useDeleteSucursal, useSucursales, useUpdateSucursal } from "../../hooks/useSucursales";
import type { SucursalRequest } from "../../types/sucursales/SucursalRequest";
import type { SucursalResponse } from "../../types/sucursales/SucursalResponse";
import DeleteSucursal from "./DeleteSucursal";
import SucursalesDetail from "./SucursalesDetail";
import SucursalesForm from "./SucursalesForm";
import SucursalesTable from "./SucursalesTable";

function SucursalesPage() {
    const { data, isLoading, error, refetch } = useSucursales();
    const createMutation = useCreateSucursal();
    const updateMutation = useUpdateSucursal();
    const deleteMutation = useDeleteSucursal();
    const [detailSucursal, setDetailSucursal] = useState<SucursalResponse | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<SucursalResponse | null>(null);
    const [formDialog, setFormDialog] = useState<{ sucursal: SucursalResponse | null; flagAction: "create" | "edit" } | null>(null);

    const handleSubmit = (values: SucursalRequest) => {
        if (formDialog?.flagAction === "edit" && formDialog.sucursal) {
            updateMutation.mutate(
                { id: formDialog.sucursal.id, sucursal: values },
                { onSuccess: () => setFormDialog(null) },
            );
        } else {
            createMutation.mutate(values, { onSuccess: () => setFormDialog(null) });
        }
    };

    const handleConfirmDelete = () => {
        if (!deleteTarget) return;
        deleteMutation.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
    };

    return (
        <Box sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                <p className="text-xl font-semibold">Sucursales</p>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={() => void refetch()}>Actualizar datos</Button>
                    <Button variant="contained" onClick={() => { createMutation.reset(); updateMutation.reset(); setFormDialog({ sucursal: null, flagAction: "create" }); }}>Crear sucursal</Button>
                </Stack>
            </Stack>
            <SucursalesTable
                sucursales={data ?? []}
                loading={isLoading}
                error={error?.message}
                deletingId={deleteMutation.isPending ? (deleteTarget?.id ?? null) : null}
                onView={setDetailSucursal}
                onEdit={(sucursal) => { createMutation.reset(); updateMutation.reset(); setFormDialog({ sucursal, flagAction: "edit" }); }}
                onDelete={(sucursal) => { deleteMutation.reset(); setDeleteTarget(sucursal); }}
            />
            <SucursalesForm
                open={!!formDialog}
                sucursal={formDialog?.sucursal ?? null}
                flagAction={formDialog?.flagAction ?? "create"}
                loading={createMutation.isPending || updateMutation.isPending}
                error={createMutation.error?.message ?? updateMutation.error?.message ?? null}
                onClose={() => setFormDialog(null)}
                onSubmit={handleSubmit}
            />
            <SucursalesDetail sucursal={detailSucursal} onClose={() => setDetailSucursal(null)} />
            <DeleteSucursal
                open={!!deleteTarget}
                sucursal={deleteTarget}
                loading={deleteMutation.isPending}
                error={deleteMutation.error?.message ?? null}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleConfirmDelete}
            />
        </Box>
    );
}

export default SucursalesPage;
