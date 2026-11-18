import { Controller, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { alpha } from '@mui/material/styles';
import { useAuth } from '../../hooks/useAuth';

type LoginFormValues = {
    username: string;
    password: string;
};

function Login() {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<LoginFormValues>({
        defaultValues: {
            username: '',
            password: '',
        },
    });
    const { mutate: loginUser, isError, isPending } = useAuth();

    const onSubmit = (authData: LoginFormValues) => {
        loginUser(authData);
    };

    return (
        <Box
            component="main"
            sx={(theme) => ({
                minHeight: '100vh',
                display: 'grid',
                placeItems: 'center',
                px: 2,
                py: 4,
                background: `radial-gradient(circle at 15% 15%, ${alpha(theme.palette.primary.main, 0.13)}, transparent 34%), radial-gradient(circle at 85% 85%, ${alpha(theme.palette.secondary.main, 0.12)}, transparent 32%), ${theme.palette.background.default}`,
            })}
        >
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    maxWidth: 440,
                    p: { xs: 3, sm: 5 },
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 4,
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                    <Box
                        sx={(theme) => ({
                            display: 'grid',
                            placeItems: 'center',
                            width: 56,
                            height: 56,
                            mb: 2.5,
                            borderRadius: 3,
                            color: 'primary.main',
                            backgroundColor: alpha(theme.palette.primary.main, 0.12),
                        })}
                    >
                        <LockOutlinedIcon sx={{ fontSize: 28 }} />
                    </Box>
                    <Typography component="h1" variant="h4" sx={{ fontWeight: 700, textAlign: 'center' }}>
                        Bienvenido
                    </Typography>
                    <Typography sx={{ mt: 1, color: 'text.secondary', textAlign: 'center' }}>
                        Ingresa tus credenciales para continuar
                    </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.25 }}>
                        <Controller
                            name="username"
                            control={control}
                            rules={{ required: 'Ingresa tu usuario' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Usuario"
                                    autoComplete="username"
                                    fullWidth
                                    error={!!errors.username}
                                    helperText={errors.username?.message}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: 'Ingresa tu contraseña' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Contraseña"
                                    type="password"
                                    autoComplete="current-password"
                                    fullWidth
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            )}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isPending}
                            sx={{
                                mt: 0.5,
                                py: 1.5,
                                borderRadius: 2,
                                fontSize: '1rem',
                                fontWeight: 700,
                                textTransform: 'none',
                                boxShadow: 'none',
                                '&:hover': { boxShadow: 'none' },
                            }}
                        >
                            {isPending ? 'Ingresando...' : 'Ingresar'}
                        </Button>
                        {isError && (
                            <Typography role="alert" sx={{ color: 'error.main', fontSize: '0.875rem', textAlign: 'center' }}>
                                Error al iniciar sesión. Revisa tus credenciales e inténtalo de nuevo.
                            </Typography>
                        )}
                    </Box>
                </Box>

                <Box sx={{ mt: 4, pt: 2.5, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Eblumbit Market Admin
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}

export default Login;
