import "../App.css"
import { useState, useContext } from 'react'; 
import { Link } from 'react-router-dom'; 
import { useForm } from 'react-hook-form'; 
import LoginContext from '../context/LoginContext'; 
import Container from '@mui/material/Container'; 
import Box from '@mui/material/Box'; 
import Typography from '@mui/material/Typography'; 
import TextField from '@mui/material/TextField'; 
import Button from '@mui/material/Button'; 
import emailImage from '../assets/img/email.png'; 

const backend = 'http://localhost:3000';

const ForgotPassword = () => {

    const [newPasswordWindow, setNewPasswordWindow] = useState(false); 
    const { userEmail, setUserEmail } = useContext(LoginContext); 
    const { formState, setError, clearErrors } = useForm(); 
    const { errors } = formState; 


    const handleEmailChange = (event) => {
        clearErrors("email");
        setUserEmail(event.target.value);
    }

    const handleForgotPassword = async () => {
        try {        
            console.log(userEmail);
            const response = await fetch(`${backend}/register/forgotpassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: userEmail})
            }); 

            const message = await response.json(); 

            if (message === "Email does not exist") {
                setError("email", {
                    type: "Manual",
                    message: "Email does not exist"
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
                        value={userEmail}
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
                        <Typography variant='h4'>                 
                            Email Confirmation                          
                        </Typography>
                        <Typography variant="subtitle1" sx={{padding: '30px'}}>
                            We have sent email to <Link href={`${userEmail}`}>{userEmail}</Link> to confirm the validity of our email address. 
                            After receiving the email follow the link provided to complete your registration.
                        </Typography>
                    </Box>
                </Container>
            </>}
        </> 
    )
}

export default ForgotPassword; 