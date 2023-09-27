import React, { useState, useRef } from 'react';
import CircleImage from '../assets/img/circle.png'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; 
import { useNavigate } from 'react-router-dom'; 

const ProfileUpdate = () => {
    const inputRef = useRef(null);
    const [image, setImage] = useState("");
    const navigate = useNavigate(); 

    const handleImageClick = () => {
        inputRef.current.click();
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        setImage(event.target.files[0]);
    }

    const handleNavigate = () => {
        navigate("//profile");
    }
    return (
        <>
            <Container style={{display: 'flex', flexDirection: 'row'}}>
                <Box>
                    <Box onClick={handleImageClick}sx={{width: '300px', height: '300px'}}>
                        {image ? <img src={URL.createObjectURL(image)} alt="" className="uploaded-image"/> : <img src={CircleImage} alt="Circle" className="uploaded-image"/>}
                        <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />                    
                    </Box>
                    <Box sx={{marginTop: '10%', marginLeft: '9%'}}>
                        <Button style={{backgroundColor: '#3e8e41', color: 'white'}} onClick={handleNavigate}>Finish update</Button>
                    </Box>
                </Box> 
               

                <Container style={{marginLeft: '25%', display: 'flex', flexDirection: 'column'}}>
                    <Box>
                        <Typography variant="h4" color="white">
                            Profile Summary
                        </Typography>                        
                    </Box>
                    <Box>
                        <Typography variant="h4" color="white">
                            Skills
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h4" color="white">
                            Connect with me
                        </Typography>
                    </Box>
                </Container>
            </Container>
        </>
    )
}

export default ProfileUpdate; 