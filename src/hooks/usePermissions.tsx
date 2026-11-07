import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { permissionService } from "../services/permissions/PermissionsService";
import type { PermissionRequest } from "../types/permissions/PermissionRequest";

export const usePermissions = () => {
    return useQuery({
        queryKey: ["permissions"],
        queryFn: permissionService.getAll,
    });
};

const useInvalidatePermissions = () => {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries({ queryKey: ["permissions"] });
};

export const useCreatePermission = () => {
    const invalidatePermissions = useInvalidatePermissions();
    return useMutation({
        mutationFn: (permission: PermissionRequest) => permissionService.create(permission),
        onSuccess: () => invalidatePermissions(),
    });
};

export const useUpdatePermission = () => {
    const invalidatePermissions = useInvalidatePermissions();
    return useMutation({
        mutationFn: ({ id, permission }: { id: number; permission: PermissionRequest }) =>
            permissionService.update(id, permission),
        onSuccess: () => invalidatePermissions(),
    });
};

export const useDeletePermission = () => {
    const invalidatePermissions = useInvalidatePermissions();
    return useMutation({
        mutationFn: (id: number) => permissionService.remove(id),
        onSuccess: () => invalidatePermissions(),
    });
};
