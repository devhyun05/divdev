import "../App.css"
import { useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import { useForm } from 'react-hook-form'; 
import Box from '@mui/material/Box'; 
import Typography from '@mui/material/Typography'; 
import TextField from '@mui/material/TextField'; 
import Button from '@mui/material/Button'; 

const backend = 'http://localhost:3000';

const ForgotPassword = () => {
    const [emailAddress, setEmailAddress] = useState(''); 
    const [newPasswordWindow, setNewPasswordWindow] = useState(false); 
    const { formState, setError, clearErrors } = useForm(); 
    const { errors } = formState; 
    
    const handleEmailChange = (event) => {
        clearErrors("email");
        setEmailAddress(event.target.value); 
    }

    const handleForgotPassword = async () => {
        try {        
            const response = await fetch(`${backend}/register/forgotpassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: emailAddress})
            }); 

            const message = await response.json(); 
            console.log(message);
            if (message === "Email does not exist") {
                setError("email", {
                    type: "Manual",
                    message: "Email already exist"
                })           
            } else {
                setNewPasswordWindow(true); 
            }
     
        } catch (error) {
           
            console.error(error); 
        }
    }; 

    return (
        <>
            {!newPasswordWindow ? <>
            
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '80%'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', width: '30%', height: '45%', backgroundColor:'white', borderRadius: '10px', padding: '50px'}}>
                    <Typography variant="h4">
                        Forgot Your Password? 
                    </Typography>
                    <Typography sx={{marginTop: '3%'}}>
                        Please enter the email address that you registered to get reset information
                    </Typography>
                    <Typography sx={{marginTop: '5%'}}>
                        Enter email address
                    </Typography>
                    <TextField
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    value={emailAddress}
                    onChange={handleEmailChange}
                    name="email"
                    />
                    <Button sx={{width: '100%', marginTop: '7%', marginBottom:'7%', backgroundColor: '#20415b', color: 'white', fontWeight: 'bold'}}
                            onClick={handleForgotPassword}>
                        Request reset link
                    </Button>
                    <Box sx={{textAlign: 'center'}}>
                        <Link to="/login"style={{textDecoration: 'none'}}>Back To Login</Link>
                    </Box>
                </Box>
            </Box>
            </>
            : 
            <>
                

            </>}
        </> 
    )
}

export default ForgotPassword; 