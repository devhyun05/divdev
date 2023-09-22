import * as React from 'react'; 
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline'; 
import TextField from '@mui/material/TextField'; 
import Box from '@mui/material/Box'; 
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; 
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider} from '@mui/material/styles'; 
import { useForm } from 'react-hook-form'; 

const backend = 'http://localhost:3000'; 

const Register = () => {
    const { register, handleSubmit, getValues, formState, watch } = useForm(); 
    const { errors } = formState; 

    const onSubmit = (data) => {
        console.log(data); 
    }

    const defaultTheme = createTheme({
        pageBackgroundColor: '#F0F0F0'
    });


    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     const data = new FormData(event.currentTarget); 
    //     const formObject = {};

    //     data.forEach((value, key) => {
    //         formObject[key] = value; 
    //     });
        
    //     const response = await fetch(`${backend}/register`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(formObject)
    //     }).then((data) =>{
    //         console.log(data);
    //     }).catch((err) => {
    //         console.log(`Error: ${err}`); 
    //     })
    // };



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
                            Register
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
                            <TextField 
                                {...register("email", {
                                    required: "Email is required"
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
                                {...register("username", {
                                    required: "Username is required"
                                })}
                                error={!!errors.username}
                                helperText={errors.username?.message}
                                margin="normal"
                                required
                                fullWidth 
                                id="username"
                                label="User/Blog name"
                                name="username"
                                autoComplete="username"
                                autoFocus 
                            /> 
                            <TextField                                
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8, 
                                        message: "Password must be at least 8 characters long."
                                    }, 
                                    maxLength: {
                                        value: 128,
                                        message: "Password can contain up to 128 characters."
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
   
                             <TextField 
                                {...register("confirm_password", {
                                    required: "Confirm password is required",
                                    validate: (value) => value === getValues("password") || "Password are not matching"
                                })}
                                error={!!errors.confirm_password}
                                helperText={errors.confirm_password?.message}
                                margin="normal"
                                required 
                                fullWidth 
                                name="confirm_password"
                                label="Confirm Password" 
                                type="password"
                                id="confirm_password"
                                autoComplete="confirm_password"
                            />
                
                            <Button 
                                type="submit"
                                fullWidth 
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Register
                            </Button>
                 
                        </Box>
                    </Box>
         
                </Container>
            </ThemeProvider>
        </>
    )
}

export default Register;