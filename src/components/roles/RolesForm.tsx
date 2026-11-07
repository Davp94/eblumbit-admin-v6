import { useForm } from "react-hook-form";
import type { RolesResponse } from "../../types/roles/RolesResponse";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import TextFieldComponent from "../../common/components/TextFieldComponent";
import SelectComponent from "../../common/components/SelectComponent";
import { usePermissions } from "../../hooks/usePermissions";
import { useEffect } from "react";

interface RolesFormProps {
    open: boolean;
    role?: RolesResponse | null;
    flagAction: 'create' | 'edit';
    loading: boolean;
    error: string | null;
    onClose: () => void;
    onSubmit: (values: RolesResponse) => Promise<void>;
}
function RolesForm ({
    open,
    role, 
    flagAction,
    loading,
    error,
    onClose,
    onSubmit
}: RolesFormProps) {

    const {
        control, 
        reset,
        handleSubmit,
    } = useForm<RolesResponse>({
        defaultValues: {
            id: 0,
            nombre: '',
            descripcion: '',
            permisosIds: []
        },
    });
    const { data } = usePermissions();

    useEffect(() => {
        reset({
            nombre: role?.nombre ?? '',
            descripcion: role?.descripcion ?? '',
            permisosIds: role?.permisosIds ?? []
        })
    }, [role, reset]);

    return(
        <>
            <Dialog
                open={open}
                onClose={()=> {
                    if(!loading){
                        onClose();
                    }
                }}
                fullWidth
                maxWidth='xs'
            >
                        <DialogTitle>
                            {flagAction === 'create' ? 'Crear rol' : 'Editar rol'}
                        </DialogTitle>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <DialogContent>
                                <Stack spacing={2} sx={{ pt: 1 }}>
                                    {error && <Alert severity="error">{error}</Alert>}
                                     <TextFieldComponent
                                        control={control}
                                        name="nombre"
                                        label="Nombre"
                                        variant="outlined"
                                        rules={{required: 'El campo nombre es requerido'}}
                                    />
                                    <TextFieldComponent
                                        control={control}
                                        name="descripcion"
                                        label="Descripcion"
                                        variant="outlined"
                                        rules={{required: 'El campo descripcion es requerido'}}
                                    />
                                    <SelectComponent
                                        control={control}
                                        name="permisosIds"
                                        label="Permisos"
                                        options={data || []}
                                        optionLabel="nombre"
                                        optionValue="id"
                                        multiple={true}
                                        labelId="permisos-select-label"
                                    />
                                </Stack>
                            </DialogContent>
                             <DialogActions sx={{px: 3, pb: 2}}>
                                <Button onClick={onClose} disabled={loading}>Cancelar</Button>
                                <Button type="submit" variant="contained" disabled={loading}>
                                    {
                                        loading
                                            ? 'Guardando...'
                                            : flagAction === 'create'
                                                ? 'Crear Rol'
                                                : 'Guardar cambios'
                                    }
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>
        </>
    )
}

export default RolesForm;
