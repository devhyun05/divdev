import * as React from 'react'; 
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

const backend = 'http://localhost:3000'; 

const Register = () => {
    const defaultTheme = createTheme({
        pageBackgroundColor: '#F0F0F0'
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget); 
        const formObject = {};

        data.forEach((value, key) => {
            formObject[key] = value; 
        });
        console.log("s")
        const response = await fetch(`${backend}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        }).then((data) =>{

            console.log(data);
        }).catch((err) => {
            console.log(`Error: ${err}`); 
        })
    };



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
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                            <TextField 
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
                                margin="normal"
                                required 
                                fullWidth 
                                name="confirm-password"
                                label="Confirm Password" 
                                type="password"
                                id="confirm-password"
                                autoComplete="confirm-password"
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