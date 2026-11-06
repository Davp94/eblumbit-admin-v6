import { useForm } from "react-hook-form";
import type { UsuariosResponse } from "../../types/usuarios/UsuariosResponse";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import TextFieldComponent from "../../common/components/TextFieldComponent";
import SelectComponent from "../../common/components/SelectComponent";
import { useRoles } from "../../hooks/useRoles";
import { useEffect } from "react";

interface UsuariosFormProps {
    open: boolean;
    usuario?: UsuariosResponse | null;
    flagAction: 'create' | 'edit';
    loading: boolean;
    error: string | null;
    onClose: () => void;
    onSubmit: (values: UsuariosResponse) => Promise<void>;
}
function UsuariosForm ({
    open,
    usuario, 
    flagAction,
    loading,
    error,
    onClose,
    onSubmit
}: UsuariosFormProps) {

    const {
        control, 
        reset,
        handleSubmit,
    } = useForm<UsuariosResponse>({
        defaultValues: {
            id: 0,
            username: '',
            nombres: '',
            apellidos: '',
            correo: '',
            rolIds: []
        },
    });
    const { data, error: errorHook, isLoading } = useRoles();

    useEffect(() => {
        reset({
            username: usuario?.username ?? '',
            nombres: usuario?.nombres ?? '',
            apellidos: usuario?.apellidos ?? '',
            correo: usuario?.correo ?? '',
            rolIds: usuario?.rolIds ?? []
        })
    }, [usuario, reset]);

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
                            {flagAction === 'create' ? 'Crear usuario' : 'Editar usuario'}
                        </DialogTitle>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <DialogContent>
                                <Stack spacing={2} sx={{ pt: 1 }}>
                                    {error && <Alert severity="error">{error}</Alert>}
                                     <TextFieldComponent
                                        control={control}
                                        name="nombres"
                                        label="Nombres"
                                        variant="outlined"
                                        rules={{required: 'El campo nombres es requerido'}}
                                    />
                                    <TextFieldComponent
                                        control={control}
                                        name="apellidos"
                                        label="Apellidos"
                                        variant="outlined"
                                        rules={{required: 'El campo apellidos es requerido'}}
                                    />
                                    <TextFieldComponent
                                        control={control}
                                        name="username"
                                        label="Username"
                                        variant="outlined"
                                        rules={{required: 'El campo username es requerido'}}
                                    />
                                    <TextFieldComponent
                                        control={control}
                                        name="correo"
                                        label="Correo"
                                        variant="outlined"
                                        rules={{required: 'El campo correo es requerido',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Ingresa un correo valido'
                                                }
                                        }}
                                    />
                                    <SelectComponent
                                        control={control}
                                        name="rolIds"
                                        label="Roles"
                                        options={data}
                                        optionLabel="nombre"
                                        optionValue="id"
                                        multiple={true}
                                        labelId="roles-select-label"
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
                                                ? 'Crear Usuario'
                                                : 'Guardar cambios'
                                    }
                                </Button>
                            </DialogActions>
                        </form>
                       
                       
                    </Dialog>
                            <Box>
            <form>
               
            </form>
        </Box>
        </>
    )
}

export default UsuariosForm;