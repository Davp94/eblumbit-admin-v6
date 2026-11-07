import { useState } from "react";
import type { RolesResponse } from "../../types/roles/RolesResponse";
import RolesTable from "./RolesTable";
import { useCreateRole, useDeleteRole, useRoles, useUpdateRole } from "../../hooks/useRoles";
import { Box, Button, Stack } from "@mui/material";
import type { RolesRequest } from "../../types/roles/RolesRequest";
import RolesForm from "./RolesForm";
import RolesDetail from "./RolesDetail";
import DeleteRole from "./DeleteRole";
function RolesPage() {
  const { data, isLoading, error, refetch } = useRoles();
  const createMutation = useCreateRole();
  const updateMutation = useUpdateRole();
  const deleteMutation = useDeleteRole();
  const [detailRole, setDetailRole] = useState<RolesResponse | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<RolesResponse | null>(null);
  const [formDialog, setFormDialog] = useState<{
    role: RolesResponse | null;
    flagAction: 'create' | 'edit'} | null>(null);
  const handleOpenCreate = () => {
    createMutation.reset();
    setDetailRole(null);
    setFormDialog({role: null, flagAction: 'create'})
  }

  const handleOpenEdit = (role: RolesResponse) => {
    createMutation.reset();
    setDetailRole(null);
    setFormDialog({role, flagAction: 'edit'})
  }

  const handleSubmit = async (values: RolesRequest) => {
      try {
        if(formDialog?.flagAction === 'edit' && formDialog.role) {
          await updateMutation.mutateAsync({
            id: formDialog.role.id,
            role: values
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
          <p className="text-xl font-semibold">Lista de Roles</p>
        </Box>
        <Button variant="contained" onClick={() => refetch()}>
          Actualizar Datos
        </Button>
        <Button
          variant="contained"
          sx={{ fontWeight: 600 }}
          onClick={handleOpenCreate}
        >
          Crear Rol
        </Button>
      </Stack>
      <RolesTable
        roles={data || []}
        loading={isLoading}
        error={error?.message}
        deletingId={
          deleteMutation.isPending ? (deleteTarget?.id ?? null) : null
        }
        onView={setDetailRole}
        onEdit={handleOpenEdit}
        onDelete={(role) => {
          deleteMutation.reset();
          setDeleteTarget(role);
        }}
      />
      <RolesForm
        open={!!formDialog}
        flagAction={formDialog?.flagAction ?? "create"}
        role={formDialog?.role ?? null}
        loading={createMutation.isPending || updateMutation.isPending}
        error={error ? error?.message : ''}
        onClose={()=>setFormDialog(null)}
        onSubmit={handleSubmit}
      />
      <RolesDetail role={detailRole} onClose={() => setDetailRole(null)} />
      <DeleteRole 
        open={!!deleteTarget}
        role={deleteTarget}
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

export default RolesPage;
