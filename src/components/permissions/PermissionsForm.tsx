import { useForm } from "react-hook-form";
import type { PermissionResponse } from "../../types/permissions/PermissionResponse";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import TextFieldComponent from "../../common/components/TextFieldComponent";
import { useEffect } from "react";

interface PermissionsFormProps {
    open: boolean;
    permission?: PermissionResponse | null;
    flagAction: 'create' | 'edit';
    loading: boolean;
    error: string | null;
    onClose: () => void;
    onSubmit: (values: PermissionResponse) => Promise<void>;
}
function PermissionsForm ({
    open,
    permission, 
    flagAction,
    loading,
    error,
    onClose,
    onSubmit
}: PermissionsFormProps) {

    const {
        control, 
        reset,
        handleSubmit,
    } = useForm<PermissionResponse>({
        defaultValues: {
            id: 0,
            nombre: '',
            detalle: '',
            descripcion: '',
            subject: '',
            action: ''
        },
    });

    useEffect(() => {
        reset({
            nombre: permission?.nombre ?? '',
            detalle: permission?.detalle ?? '',
            descripcion: permission?.descripcion ?? '',
            subject: permission?.subject ?? '',
            action: permission?.action ?? ''
        })
    }, [permission, reset]);

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
                            {flagAction === 'create' ? 'Crear permiso' : 'Editar permiso'}
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
                                        name="detalle"
                                        label="Detalle"
                                        variant="outlined"
                                        rules={{required: 'El campo detalle es requerido'}}
                                    />
                                    <TextFieldComponent
                                        control={control}
                                        name="descripcion"
                                        label="Descripcion"
                                        variant="outlined"
                                        rules={{required: 'El campo descripcion es requerido'}}
                                    />
                                    <TextFieldComponent
                                        control={control}
                                        name="subject"
                                        label="Subject"
                                        variant="outlined"
                                        rules={{required: 'El campo subject es requerido'}}
                                    />
                                    <TextFieldComponent
                                        control={control}
                                        name="action"
                                        label="Action"
                                        variant="outlined"
                                        rules={{required: 'El campo action es requerido'}}
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
                                                ? 'Crear Permiso'
                                                : 'Guardar cambios'
                                    }
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>
        </>
    )
}

export default PermissionsForm;
