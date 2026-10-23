import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../../hooks/useAuth';
function Login() {

    const {
        control,
        formState: {errors},
        getValues
    } = useForm({
        defaultValues: {
            username: '',
            password: ''
        },
    });
    const { mutate: loginUser, error, isError, isPending } = useAuth();

    const onSubmit = async () => {
        const authData = getValues();
        loginUser(authData);
    }

    return(
        <div className = 'flex min-h-screen items-center justify-center bg-slate-100 p-4'>

            <Paper elevation={2} 
                sx={{
                    width: '100%',
                    maxWidth: 450,
                    p: { xs: 3, sm: 5},
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 4
                }}
            >
                {/* HeaderIcon & title */}
                <div className='flex flex-col items-center justify-center mb-6'>
                    <div className='bg-indigo-100 p-3 rounded-2xl mb-3 text-indigo-600 text-center'>
                        <span className="material-symbols-outlined">
                            <LockOutlinedIcon sx={{fontSize: 30}} />
                        </span>
                        <Typography component="h1" variant='h5' sx={{fontWeight: 700, color: 'text.primary'}}>
                            Bienvenido
                        </Typography>
                        <Typography sx={{mt: 1, color: 'text.secondary'}}>
                            Por favor ingrese sus credenciales
                        </Typography>
                    </div>
                </div>
                {/* login form */}
                <form className='flex flex-col gap-4'>
                    <Controller
                        name='username'
                        control={control}
                        rules={{required: 'ingrese su usuario'}}
                        render={({field}) => (
                            <TextField {...field} label="Username" 
                            variant="outlined"
                            error={!!errors.username}
                            helperText={errors.username?.message}
                            margin='normal'/>
                        )}
                    />
                    <Controller
                        name='password'
                        control={control}
                        rules={{required: 'ingrese su password'}}
                        render={({field}) => (
                            <TextField {...field} label="Password" 
                            variant="outlined" type='password'
                            margin='normal'
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            />
                        )}
                    />
                    <Button variant='contained' fullWidth 
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            backgroundColor: '#423e96',
                            fontSize: '1rem',
                            fontWeight: 600
                        }}
                        disabled={isPending}
                        onClick={()=>onSubmit()}>
                        {isPending ? 'Ingresando...' : 'Ingresar'}
                    </Button>
                    {isError && (
                        <p className='text-red-600 text-sm'>
                            Error en login. Revice sus credenciales.
                        </p>
                    )}
                </form>
                {/* submit */}
                
                {/* Footer */}
                <div className='text-center pt-4 border-t'>
                    <Typography sx={{
                        mt:4,
                        pt: 3,
                        color: 'text.secondary',
                        textAlign: 'center'
                    }}>
                        Eblumbit Market Admin 
                    </Typography>
                </div>
            </Paper>
        </div>
        
    )
}

export default Login;