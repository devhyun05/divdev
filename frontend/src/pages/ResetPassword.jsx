import { useContext } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import LoginContext from '../context/LoginContext'; 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const backend = 'https://www.divdev.pro';

const ResetPassword = () => {
    const { register, handleSubmit, formState, clearErrors} = useForm();
    const { errors } = formState;
    const { userEmail } = useContext(LoginContext); 
    const navigate = useNavigate(); 


    const handleClearPassword = (event) => {
        clearErrors("password");
    }

    const handleClearConfirmPassword = () => {
        clearErrors("confirm_password"); 
    }

    
    const onSubmit = async (data) => {    
        console.log(userEmail);
        try {
            await fetch(`${backend}/register/resetpassword`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application.json'
                },
                body: JSON.stringify({ email: userEmail, password: data.password })
            })
            navigate("/login");
        } catch (error) {
            console.error(error); 
        }
    }


    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '80%' }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', width: '30%', height: '48%', backgroundColor: 'white', borderRadius: '10px', padding: '50px' }}>
                    <Typography variant="h4">
                        Reset Password
                    </Typography>


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
                        onChange={handleClearPassword}
                        margin="normal"
                        fullWidth
                        name="password"
                        label="New Password"
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
                        onChange={handleClearConfirmPassword}
                        margin="normal"
                        fullWidth
                        name="confirm_password"
                        label="New Confirm Password"
                        type="password"
                        id="confirm_password"
                        autoComplete="confirm_password"
                    />

                    <Button sx={{ width: '100%', marginTop: '4%', marginBottom: '4%', backgroundColor: '#20415b', color: 'white', fontWeight: 'bold' }}
                        type="submit"
                    >
                        Reset Password
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                        <Link to="/login" style={{ textDecoration: 'none' }}>Back To Login</Link>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ResetPassword; 