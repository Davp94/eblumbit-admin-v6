import { useForm } from "react-hook-form";
import type { UsuariosResponse } from "../../types/usuarios/UsuariosResponse";
import { Box } from "@mui/material";
import TextFieldComponent from "../../common/components/TextFieldComponent";

interface UsuariosFormProps {
    usuario?: UsuariosResponse | null;
    flagAction: string;
}
function UsuariosForm ({usuario, flagAction}: UsuariosFormProps) {

    const {
        control, 
        reset,
        getValues,
        handleSubmit,
        watch
    } = useForm({
        defaultValues: {
            id: 0,
            username: '',
            nombres: '',
            apellidos: '',
            correo: '',
            roles: []
        },
    });
    return(
        <Box>
            <form>
                <TextFieldComponent
                    control={control}
                    name="nombres"
                    label="Nombres"
                    variant="outlined"
                />
                <TextFieldComponent
                    control={control}
                    name="apellidos"
                    label="Apellidos"
                    variant="outlined"
                />
            </form>
        </Box>
    )
}

export default UsuariosForm;