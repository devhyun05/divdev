import {useContext } from 'react';
import LoginContext from '../context/LoginContext'; 
import { Link } from 'react-router-dom'; 
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'; 
import Button from '@mui/material/Button';


const Project = () => {
    const { userName } = useContext(LoginContext); 
    return (
        <>
        <Container>
            <Box sx={{textAlign: 'right', marginTop: '30px'}}>
                <Link to={`/${userName}/projectupdate`}>
                    <Button sx={{backgroundColor: '#3e8e41', color: 'white'}}>Update Project</Button>     
                </Link>
            </Box>
        </Container>
        </>
    )
}

export default Project; 