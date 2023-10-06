import React, { useContext } from 'react'; 
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

    const navigate = useNavigate(); 
    const { setIsLoggedIn, setUserName } = useContext(LoginContext); 
    const { register, handleSubmit, formState, clearErrors, setError} = useForm(); 
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
        }).then(response => {
            if (response.status === 404) {
                throw new Error (1);                
            } else if (response.status === 401) {
                throw new Error (2);
            } else {
                return response.json(); 
            }
        })
        .then(data => {
            setIsLoggedIn(true); 
            setUserName(data);                    
            navigate(`/${data}`);
            window.localStorage.setItem('isLoggedIn', true); 
            window.localStorage.setItem('username', data);
        }).catch(error =>{    
            
            if (error.message === "1") {            
                setError("email", {
                    type: "Manual",
                    message: "Email does not exist"
                })
            } else if (error.message === "2") {
                setError("password", {
                    type: "Manual",
                    message: "Password does not match"
                })
            }

        })
    }

    const handleTypeEmail = (e) => {
        clearErrors("email");
   
    }

    const handleTypePassword = (e) => {
        clearErrors("password");       
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
                                    
                                })}                                
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                onChange={handleTypeEmail}
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
                                })}
                                onChange={handleTypePassword}
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