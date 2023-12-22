import { useState} from 'react'; 
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline'; 
import TextField from '@mui/material/TextField'; 
import Box from '@mui/material/Box'; 
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider} from '@mui/material/styles'; 
import { useForm } from 'react-hook-form'; 
import { Link } from 'react-router-dom'; 
import emailImage from '../assets/img/email.png'; 

const backend = "http://localhost:8000" 

const Register = () => {
    const { register, handleSubmit, formState, setError, clearErrors} = useForm(); 
    const { errors } = formState; 
    const [confirmEmailMessage, setConfirmEmailMessage] = useState(false); 
    const [changePage, setChangePage] = useState(false);
    const [email, setEmail] = useState(""); 

    const onSubmit = async (data) => {
        setEmail(data.email)

        await fetch(`${backend}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then((data) =>{
            if (data === "1") {
                setError("email", {
                    type: "Manual",
                    message: "Email already exist"
                })
                setChangePage(false);
                setConfirmEmailMessage(false);

            } else if (data === "2") {
                setError("username", {
                    type: "Manual",
                    message: "Username already exist"
                })
                setChangePage(false);
                setConfirmEmailMessage(false);
            } else {
                setConfirmEmailMessage(true);
                setChangePage(true);
            }
 
        }).catch((err) => {             
            setConfirmEmailMessage(false);
            setChangePage(false);
            setError(err.message);
        })
    }

    const defaultTheme = createTheme({
        pageBackgroundColor: '#F0F0F0'
    });

    const handleClearEmailError = () => {
        clearErrors("email");
    }

    const handleClearUserNameError = () => {
        clearErrors("username");
    }

    const handleClearPasswordError = () => {
        clearErrors("password");
    }

    const handleClearConfirmPasswordError = () => {
        clearErrors("confirm_password")
    }
    return (
        <>
            {!confirmEmailMessage && !changePage ?
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
                       
                        </Avatar>
                        <Typography component="h1" variant="h5" style={{color: 'black'}}>
                            Register
                        </Typography>
                 
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
                            <TextField 
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value:
                                          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                        message: 'Email is invalid.',
                                    }
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                onChange={handleClearEmailError}
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
                                onChange={handleClearUserNameError}
                                margin="normal"
                                required
                                fullWidth 
                                id="username"
                                label="User/Blog name"
                                name="username"
                                autoComplete="username"
                            /> 
                            <TextField                                
                                {...register("password", {
                                    required: "Password is required",
                                    pattern: {
                                        value:
                                        /(?=.*\d{1,50})(?=.*[~`!@#$%^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/,
                                        message:
                                        'Please use a password of 8 to 16 characters with a combination of upper and lower case letters, numbers, and special symbols'
                                    }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                onChange={handleClearPasswordError}
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
                                })}
                                error={!!errors.confirm_password}
                                helperText={errors.confirm_password?.message}
                                onChange={handleClearConfirmPasswordError}
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
            : 
            <Container sx={{display: 'flex', justifyContent: 'center', paddingTop: '10%'}}>
                <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '30px',
                        paddingTop: '40px',
                        width: 600, 
                        height: 400,
                        backgroundColor: '#ffffff',
                        borderRadius: '10px'}}>
                    <img src={emailImage} alt="" style={{width: '120px'}}/>
                    <Typography variant='h4' sx={{color: 'black'}}>                 
                        Email Confirmation                          
                    </Typography>
                    <Typography variant="subtitle1" sx={{padding: '30px', color: 'black'}} >
                        We have sent email to <Link href={`${email}`}>{email}</Link> to confirm the validity of our email address. 
                        After receiving the email follow the link provided to complete your registration.
                    </Typography>
                </Box>
            </Container>
            }
        </>
    )
}

export default Register;