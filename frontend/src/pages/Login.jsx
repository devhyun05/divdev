import React, { useState, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import LoginContext from '../context/LoginContext'; 
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline'; 
import TextField from '@mui/material/TextField'; 
import FormControlLabel from '@mui/material/FormControlLabel'; 
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'; 
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; 
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider} from '@mui/material/styles'; 
import { useForm } from 'react-hook-form'; 


const backend = 'http://localhost:3000';

const Login = () => {
    const [loginVerification, setLoginVerification] = useState(true); 
    const navigate = useNavigate(); 
    const { setIsLoggedIn, setUserName } = useContext(LoginContext); 
    const { register, handleSubmit, formState } = useForm(); 
    const { errors } = formState; 
    const defaultTheme = createTheme({
        pageBackgroundColor: '#F0F0F0'
    });
    
    const onSubmit = async (data) => {
        await fetch(`${backend}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(data => {
            setIsLoggedIn(true); 
            setLoginVerification(true); 
            setUserName(data);
            navigate(`/${data}`);
        }).catch(err =>{
            setLoginVerification(false); 
            console.log(err);
        })
    }
    return (
        <>
            <ThemeProvider theme={defaultTheme} >
                <Container component="main" maxWidth="xs" style={{backgroundColor: '#F0F0F0', borderRadius: '10px'}}>
                    <CssBaseline/>
                    <Box 
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center', 
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon /> 
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
          
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
                            <TextField 
                                {...register("email",{
                                    required: "Email is required",                                                       
                                    validate: {
                                        emailValidationFailed: () => 
                                            loginVerification || "Email does not exist",
                                    }
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                margin="normal"
                                required
                                fullWidth 
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus 
                            /> 
                            <TextField 
                                {...register("password",{
                                    required: "Password is required",
                                    validate: {
                                        passwordValidationFailed: () => 
                                            loginVerification || "Password does not match",
                                    }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                margin="normal"
                                required
                                fullWidth 
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                             />
                             <FormControlLabel 
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> 
                            <Button 
                                type="submit"
                                fullWidth 
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password? 
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
         
                </Container>
            </ThemeProvider>
        </>
    )
}

export default Login; 