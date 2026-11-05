import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { rolesService } from "../services/roles/RolesService";
import type { RolesRequest } from "../types/roles/RolesRequest";

export const useRoles = () => {
    return useQuery({
        queryKey: ["roles"],
        queryFn: rolesService.getAll,
    });
};

const useInvalidateRoles = () => {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries({ queryKey: ["roles"] });
};

export const useCreateRole = () => {
    const invalidateRoles = useInvalidateRoles();
    return useMutation({
        mutationFn: (role: RolesRequest) => rolesService.create(role),
        onSuccess: () => invalidateRoles(),
    });
};

export const useUpdateRole = () => {
    const invalidateRoles = useInvalidateRoles();
    return useMutation({
        mutationFn: ({ id, role }: { id: number; role: RolesRequest }) =>
            rolesService.update(id, role),
        onSuccess: () => invalidateRoles(),
    });
};

export const useDeleteRole = () => {
    const invalidateRoles = useInvalidateRoles();
    return useMutation({
        mutationFn: (id: number) => rolesService.remove(id),
        onSuccess: () => invalidateRoles(),
    });
};
