import { useState } from "react";
import type { UsuariosResponse } from "../../types/usuarios/UsuariosResponse";
import UsuariosTable from "./UsuariosTable";
import { useUsuarios } from "../../hooks/useUsuarios";
import { Box, Button, Stack } from "@mui/material";
function UsuariosPage() {
  const { data, isLoading, isError, error, refetch } = useUsuarios();
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
  return (
    <Box sx={{p: 3}}>
      <Stack
        direction={'row'} spacing={2} sx={{alignItems: 'center', justifyContent: 'space-between', mb: 3}}>
        <Box>
          <p className="text-xl font-semibold">Lista de Usuarios</p>
        </Box>
        <Button variant="contained" onClick={() => refetch()}>
          Actualizar Datos
        </Button>
      </Stack>
      <UsuariosTable usuarios={usuarios} />
    </Box>
  );
}

export default UsuariosPage;
