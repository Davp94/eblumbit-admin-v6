import { useState } from "react";
import type { PermissionResponse } from "../../types/permissions/PermissionResponse";
import PermissionsTable from "./PermissionsTable";
import { useCreatePermission, useDeletePermission, usePermissions, useUpdatePermission } from "../../hooks/usePermissions";
import { Box, Button, Stack } from "@mui/material";
import type { PermissionRequest } from "../../types/permissions/PermissionRequest";
import PermissionsForm from "./PermissionsForm";
import PermissionsDetail from "./PermissionsDetail";
import DeletePermission from "./DeletePermission";
function PermissionsPage() {
  const { data, isLoading, error, refetch } = usePermissions();
  const createMutation = useCreatePermission();
  const updateMutation = useUpdatePermission();
  const deleteMutation = useDeletePermission();
  const [detailPermission, setDetailPermission] = useState<PermissionResponse | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PermissionResponse | null>(null);
  const [formDialog, setFormDialog] = useState<{
    permission: PermissionResponse | null;
    flagAction: 'create' | 'edit'} | null>(null);
  const handleOpenCreate = () => {
    createMutation.reset();
    setDetailPermission(null);
    setFormDialog({permission: null, flagAction: 'create'})
  }

  const handleOpenEdit = (permission: PermissionResponse) => {
    createMutation.reset();
    setDetailPermission(null);
    setFormDialog({permission, flagAction: 'edit'})
  }

  const handleSubmit = async (values: PermissionRequest) => {
      try {
        if(formDialog?.flagAction === 'edit' && formDialog.permission) {
          await updateMutation.mutateAsync({
            id: formDialog.permission.id,
            permission: values
          })
        }else {
          await createMutation.mutateAsync(values)
        }
        setFormDialog(null);
      } catch (error) {
        console.log('error', error);
      }
  }

  const handleConfirmDelete = async () => {
    if(!deleteTarget) {
      return;
    }
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction={"row"}
        spacing={2}
        sx={{ alignItems: "center", justifyContent: "space-between", mb: 3 }}
      >
        <Box>
          <p className="text-xl font-semibold">Lista de Permisos</p>
        </Box>
        <Button variant="contained" onClick={() => refetch()}>
          Actualizar Datos
        </Button>
        <Button
          variant="contained"
          sx={{ fontWeight: 600 }}
          onClick={handleOpenCreate}
        >
          Crear Permiso
        </Button>
      </Stack>
      <PermissionsTable
        permissions={data || []}
        loading={isLoading}
        error={error?.message}
        deletingId={
          deleteMutation.isPending ? (deleteTarget?.id ?? null) : null
        }
        onView={setDetailPermission}
        onEdit={handleOpenEdit}
        onDelete={(permission) => {
          deleteMutation.reset();
          setDeleteTarget(permission);
        }}
      />
      <PermissionsForm
        open={!!formDialog}
        flagAction={formDialog?.flagAction ?? "create"}
        permission={formDialog?.permission ?? null}
        loading={createMutation.isPending || updateMutation.isPending}
        error={error ? error?.message : ''}
        onClose={()=>setFormDialog(null)}
        onSubmit={handleSubmit}
      />
      <PermissionsDetail permission={detailPermission} onClose={() => setDetailPermission(null)} />
      <DeletePermission 
        open={!!deleteTarget}
        permission={deleteTarget}
        loading={deleteMutation.isPending}
        error={
          deleteMutation.error?.message || null
        }
        onClose={()=>setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}

export default PermissionsPage;
