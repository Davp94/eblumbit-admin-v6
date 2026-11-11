import { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { useAlmacenes, useCreateAlmacen, useDeleteAlmacen, useUpdateAlmacen } from "../../hooks/useAlmacenes";
import type { AlmacenRequest } from "../../types/almacenes/AlmacenRequest";
import type { AlmacenResponse } from "../../types/almacenes/AlmacenResponse";
import AlmacenesDetail from "./AlmacenesDetail";
import AlmacenesForm from "./AlmacenesForm";
import AlmacenesTable from "./AlmacenesTable";
import DeleteAlmacen from "./DeleteAlmacen";

function AlmacenesPage() {
    const { data, isLoading, error, refetch } = useAlmacenes();
    const createMutation = useCreateAlmacen();
    const updateMutation = useUpdateAlmacen();
    const deleteMutation = useDeleteAlmacen();
    const [detailAlmacen, setDetailAlmacen] = useState<AlmacenResponse | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<AlmacenResponse | null>(null);
    const [formDialog, setFormDialog] = useState<{ almacen: AlmacenResponse | null; flagAction: "create" | "edit" } | null>(null);

    const handleSubmit = (values: AlmacenRequest) => {
        if (formDialog?.flagAction === "edit" && formDialog.almacen) {
            updateMutation.mutate(
                { id: formDialog.almacen.id, almacen: values },
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
                <p className="text-xl font-semibold">Almacenes</p>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={() => void refetch()}>Actualizar datos</Button>
                    <Button variant="contained" onClick={() => { createMutation.reset(); updateMutation.reset(); setFormDialog({ almacen: null, flagAction: "create" }); }}>Crear almacén</Button>
                </Stack>
            </Stack>
            <AlmacenesTable
                almacenes={data ?? []}
                loading={isLoading}
                error={error?.message}
                deletingId={deleteMutation.isPending ? (deleteTarget?.id ?? null) : null}
                onView={setDetailAlmacen}
                onEdit={(almacen) => { createMutation.reset(); updateMutation.reset(); setFormDialog({ almacen, flagAction: "edit" }); }}
                onDelete={(almacen) => { deleteMutation.reset(); setDeleteTarget(almacen); }}
            />
            <AlmacenesForm
                open={!!formDialog}
                almacen={formDialog?.almacen ?? null}
                flagAction={formDialog?.flagAction ?? "create"}
                loading={createMutation.isPending || updateMutation.isPending}
                error={createMutation.error?.message ?? updateMutation.error?.message ?? null}
                onClose={() => setFormDialog(null)}
                onSubmit={handleSubmit}
            />
            <AlmacenesDetail almacen={detailAlmacen} onClose={() => setDetailAlmacen(null)} />
            <DeleteAlmacen
                open={!!deleteTarget}
                almacen={deleteTarget}
                loading={deleteMutation.isPending}
                error={deleteMutation.error?.message ?? null}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleConfirmDelete}
            />
        </Box>
    );
}

export default AlmacenesPage;
