import { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { useCreateProveedor, useDeleteProveedor, useProveedores, useUpdateProveedor } from "../../hooks/useProveedores";
import type { ProveedorRequest } from "../../types/proveedores/ProveedorRequest";
import type { ProveedorResponse } from "../../types/proveedores/ProveedorResponse";
import DeleteProveedor from "./DeleteProveedor";
import ProveedoresDetail from "./ProveedoresDetail";
import ProveedoresForm from "./ProveedoresForm";
import ProveedoresTable from "./ProveedoresTable";

function ProveedoresPage() {
    const { data, isLoading, error, refetch } = useProveedores();
    const createMutation = useCreateProveedor();
    const updateMutation = useUpdateProveedor();
    const deleteMutation = useDeleteProveedor();
    const [detailProveedor, setDetailProveedor] = useState<ProveedorResponse | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<ProveedorResponse | null>(null);
    const [formDialog, setFormDialog] = useState<{ proveedor: ProveedorResponse | null; flagAction: "create" | "edit" } | null>(null);

    const handleSubmit = (values: ProveedorRequest) => {
        const proveedor = { ...values, observaciones: values.observaciones?.trim() || null };
        if (formDialog?.flagAction === "edit" && formDialog.proveedor) {
            updateMutation.mutate(
                { id: formDialog.proveedor.id, proveedor },
                { onSuccess: () => setFormDialog(null) },
            );
        } else {
            createMutation.mutate(proveedor, { onSuccess: () => setFormDialog(null) });
        }
    };

    const handleConfirmDelete = () => {
        if (!deleteTarget) return;
        deleteMutation.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
    };

    return (
        <Box sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                <p className="text-xl font-semibold">Proveedores</p>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={() => void refetch()}>Actualizar datos</Button>
                    <Button variant="contained" onClick={() => { createMutation.reset(); updateMutation.reset(); setFormDialog({ proveedor: null, flagAction: "create" }); }}>Crear proveedor</Button>
                </Stack>
            </Stack>
            <ProveedoresTable
                proveedores={data ?? []}
                loading={isLoading}
                error={error?.message}
                deletingId={deleteMutation.isPending ? (deleteTarget?.id ?? null) : null}
                onView={setDetailProveedor}
                onEdit={(proveedor) => { createMutation.reset(); updateMutation.reset(); setFormDialog({ proveedor, flagAction: "edit" }); }}
                onDelete={(proveedor) => { deleteMutation.reset(); setDeleteTarget(proveedor); }}
            />
            <ProveedoresForm
                open={!!formDialog}
                proveedor={formDialog?.proveedor ?? null}
                flagAction={formDialog?.flagAction ?? "create"}
                loading={createMutation.isPending || updateMutation.isPending}
                error={createMutation.error?.message ?? updateMutation.error?.message ?? null}
                onClose={() => setFormDialog(null)}
                onSubmit={handleSubmit}
            />
            <ProveedoresDetail proveedor={detailProveedor} onClose={() => setDetailProveedor(null)} />
            <DeleteProveedor
                open={!!deleteTarget}
                proveedor={deleteTarget}
                loading={deleteMutation.isPending}
                error={deleteMutation.error?.message ?? null}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleConfirmDelete}
            />
        </Box>
    );
}

export default ProveedoresPage;
