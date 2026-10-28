import { useQuery } from "@tanstack/react-query"
import { usuarioService } from "../services/usuarios/UsuariosService";

export const useUsuarios = ()  => {
    return useQuery({
        queryKey: ['usuarios'],
        queryFn: usuarioService.getAll
    });
}