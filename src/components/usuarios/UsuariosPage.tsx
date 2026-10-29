import { useState } from "react";
import type { UsuariosResponse } from "../../types/usuarios/UsuariosResponse";
import UsuariosTable from "./UsuariosTable";
import { useCreateUsuario, useDeleteUsuario, useUpdateUsuario, useUsuarios } from "../../hooks/useUsuarios";
import { Box, Button, Stack } from "@mui/material";
import type { UsuariosRequest } from "../../types/usuarios/UsuariosRequest";
import UsuariosForm from "./UsuariosForm";
import UsuariosDetail from "./UsuariosDetail";
import DeleteUsuario from "./DeleteUsuario";
function UsuariosPage() {
  const { data, isLoading, isError, error, refetch } = useUsuarios();
  const createMutation = useCreateUsuario();
  const updateMutation = useUpdateUsuario();
  const deleteMutation = useDeleteUsuario();
  const [usuarios] = useState<UsuariosResponse[]>([
    {
      id: 1,
      nombres: "usuario 1",
      apellidos: "usuario 1 ap",
      username: "usuario1",
      correo: "test@test.com",
      rolIds: [1, 2],
      sucursalId: [1, 2],
    },
    {
      id: 2,
      nombres: "usuario 2",
      apellidos: "usuario 2 ap",
      username: "usuario2",
      correo: "test2@test2.com",
      rolIds: [1, 2],
      sucursalId: [1, 2],
    },
    {
      id: 3,
      nombres: "usuario 3",
      apellidos: "usuario 3 ap",
      username: "usuario3",
      correo: "test3@test3.com",
      rolIds: [1, 2],
      sucursalId: [1, 2],
    },
  ]);
  const [detailUsuario, setDetailUsuario] = useState<UsuariosResponse | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<UsuariosResponse | null>(null);
  const [formDialog, setFormDialog] = useState<{
    usuario: UsuariosResponse | null;
    flagAction: string} | null>(null);
  const handleOpenCreate = () => {
    createMutation.reset();
    setDetailUsuario(null);
    setFormDialog({usuario: null, flagAction: 'create'})
  }

  const handleOpenEdit = (usuario: UsuariosResponse) => {
    createMutation.reset();
    setDetailUsuario(null);
    setFormDialog({usuario, flagAction: 'edit'})
  }

  const handleSubmit = async (values: UsuariosRequest) => {
      try {
        if(formDialog?.flagAction === 'edit' && formDialog.usuario) {
          await updateMutation.mutateAsync({
            id: formDialog.usuario.id,
            usuario: values
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
          <p className="text-xl font-semibold">Lista de Usuarios</p>
        </Box>
        <Button variant="contained" onClick={() => refetch()}>
          Actualizar Datos
        </Button>
        <Button
          variant="contained"
          sx={{ fontWeight: 600 }}
          onClick={handleOpenCreate}
        >
          Crear Usuario
        </Button>
      </Stack>
      <UsuariosTable
        usuarios={usuarios}
        loading={isLoading}
        error={error?.message}
        deletingId={
          deleteMutation.isPending ? (deleteTarget?.id ?? null) : null
        }
        onView={setDetailUsuario}
        onEdit={handleOpenEdit}
        onDelete={(usuario) => {
          deleteMutation.reset();
          setDeleteTarget(usuario);
        }}
      />
      {/* <UsuariosForm
        flagAction={formDialog?.flagAction ?? "create"}
        usuario={formDialog?.usuario ?? null}
        loading={createMutation.isPending || updateMutation.isPending}
        error={error ? error?.message: ''}
        onClose={()=>setFormDialog(null)}
        onSubmit={handleSubmit}
      /> */}
      <UsuariosDetail />
      <DeleteUsuario 
        open={!!deleteTarget}
        usuario={deleteTarget}
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

export default UsuariosPage;
