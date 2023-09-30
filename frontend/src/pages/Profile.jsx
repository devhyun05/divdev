import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import LoginContext from '../context/LoginContext'; 
import CircleImage from '../assets/img/circle.png'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; 
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
const backend = 'http://localhost:3000';


const Profile = () => {
    const { userName } = useContext(LoginContext); 
    const [profileDesc, setProfileDesc] = useState("");
    const [skills, setSkills] = useState([]);
    const [media, setMedia] = useState([]); 
    const [icon, setIcon] = useState([]);


    const navigate = useNavigate(); 
    
    useEffect(()=>{
        fetchProfile(); 
    }, [])

    const fetchProfile = async () => {
        await fetch(`${backend}/${userName}/profile/get-profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({username: userName})
        }).then(response => response.json())
        .then(data => {
            setProfileDesc(data.profileDesc);
            setSkills(data.userSkills);                          
            setMedia([data.userMedia])
    
            if (data.userMedia[0].text === 'Github') {
                setIcon(<GitHubIcon/>);
            }
        }).catch(err => {
            console.log(err); 
        })
    }


    const handleRouteToUpdatePage = () => {
        navigate(`/${userName}/profileupdate`)
    }


    return (
        <>
            <Container style={{display: 'flex', flexDirection: 'row'}}>
                <Box>
                    <Box onClick={handleRouteToUpdatePage}sx={{width: '250px', height: '250px'}}>
                        <img src={CircleImage} alt="Circle" className="uploaded-image"/>                                    
                    </Box>
                    <Box sx={{marginTop: '50%', marginLeft: '39%'}}>
                        <Button onClick={handleRouteToUpdatePage} style={{backgroundColor: '#3e8e41', color: 'white'}}>Update Profile</Button>
                    </Box>
                </Box> 
               

                <Container style={{marginLeft: '25%', display: 'flex', flexDirection: 'column'}}>
                    <Box>
                        <Typography variant="h4" color="white">
                            Profile Summary
                        </Typography>      
                        <Box sx={{borderColor: 'white', color: 'white'}}>
                            {profileDesc}
                        </Box>             
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
                        
                        {media && media.map((item, index) => (
                                    <span key={index}>                                
                                        <Link to={item[0].mediaURL}>
                                        
                                            <Button sx={[
                                                { 
                                                    color: `${item[0].textColor}`, 
                                                    backgroundColor: `${item[0].backgroundColor}`,
                                                    marginTop: '20px',
                                                    marginRight: '15px'
                                                },
                                                {
                                                    '&:hover': {                                          
                                                    backgroundColor: 'lightgrey',
                                                    },
                                                },
                                                ]}>                                                
                                                    {item[0].text} {icon}                                                
                                            </Button>
                                        </Link>
                                    </span>
                        ))}       
                    </Box>
                </Container>
            </Container>
        </>
    )
}

export default Profile; 