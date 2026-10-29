import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { usuarioService } from "../services/usuarios/UsuariosService";
import type { UsuariosRequest } from "../types/usuarios/UsuariosRequest";

export const useUsuarios = ()  => {
    return useQuery({
        queryKey: ['usuarios'],
        queryFn: usuarioService.getAll
    });
}

const useInvalidateUsuarios = () => {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries({queryKey: ['usuarios']});
}

export const useCreateUsuario = () => {
    const invalidateUsuarios = useInvalidateUsuarios();
    return useMutation({
        mutationFn: (usuario: UsuariosRequest) => usuarioService.create(usuario),
        onSuccess: () => invalidateUsuarios(),
    })
}

export const useUpdateUsuario = () => {
    const invalidateUsuarios = useInvalidateUsuarios();
    return useMutation({
        mutationFn: ({id, usuario}: {id: number, usuario: UsuariosRequest}) => 
            usuarioService.update(id, usuario),
        onSuccess: () => invalidateUsuarios(),
    })
}
export const useDeleteUsuario = () => {
    const invalidateUsuarios = useInvalidateUsuarios();
    return useMutation({
        mutationFn: (id: number) => usuarioService.remove(id),
        onSuccess: () => invalidateUsuarios(),
    })
}