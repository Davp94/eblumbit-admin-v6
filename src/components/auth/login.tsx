import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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

    const onSubmit = async () => {
        const authData = getValues();
        console.log('AUTH DATA', authData);
    }

    return(
        <div className = 'min-h-screen flex items-center justify-center bg-slate-100 p-4'>

            <section className='w-full max-w-md !p-8 rounded-2xl shadow-xl bg-white border border-gray-100'>
                {/* HeaderIcon & title */}
                <div className='flex flex-col items-center justify-center mb-6'>
                    <div className='bg-indigo-100 p-3 rounded-2xl mb-3 text-indigo-600 text-center'>
                        <span className="material-symbols-outlined">
                            lock
                        </span>
                        <Typography component="h1" variant='h5' className='font-bold text-gray-800'>
                            Bienvenido
                        </Typography>
                        <Typography className='text-gray-500 mt-1'>
                            Por favor ingrese sus credenciales
                        </Typography>
                    </div>
                </div>
                {/* login form */}
                <form className='!space-y-4'>
                    <Controller
                        name='username'
                        control={control}
                        render={({field}) => (
                            <TextField {...field} label="Username" 
                            variant="outlined" 
                            margin='normal'/>
                        )}
                    />
                    <Controller
                        name='password'
                        control={control}
                        render={({field}) => (
                            <TextField {...field} label="Password" 
                            variant="outlined" type='password'
                            margin='normal'/>
                        )}
                    />
                    <Button variant='contained' fullWidth className='py-3 bg-indigo-600 hover:bg-indigo-700 
                    font-semibold text-base transition-colors' onClick={()=>onSubmit()}>
                        Ingresar
                    </Button>
                </form>
                {/* submit */}
                
                {/* Footer */}
                <div className='text-center pt-4 border-t'>
                    <Typography className='text-gray-600'>
                        Eblumbit Market Admin 
                    </Typography>
                </div>
            </section>
        </div>
        
    )
}

export default Login;