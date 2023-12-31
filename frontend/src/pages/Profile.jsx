import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import LoginContext from '../context/LoginContext'; 
import CircleImage from '../assets/img/circle.png';
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

const backend = process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://www.divdev.pro";  


const Profile = () => {
    const { userName, userRole, userProfileImage } = useContext(LoginContext); 
    const [profileDesc, setProfileDesc] = useState("");
    const [skills, setSkills] = useState([]);
    const [media, setMedia] = useState([]); 

    const navigate = useNavigate(); 

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
            setMedia(data.userMedia)
        }).catch(err => {
            console.log(err); 
        })
    }
    
    useEffect(()=>{
        fetchProfile(); 
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const iconComponents = {
        GitHubIcon: <GitHubIcon/>, 
        LinkedinIcon: <LinkedInIcon/>, 
        InstagramIcon: <InstagramIcon/>, 
        FacebookIcon: <FacebookIcon/>, 
        TwitterIcon: <TwitterIcon/>,
        YouTubeIcon: <YouTubeIcon/> 
    }



    const handleRouteToUpdatePage = () => {
        navigate(`/${userName}/profileupdate`)
    }


    return (
        <>
    
            <Container style={{display: 'flex', flexDirection: 'row', marginTop: '5%'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '100px'}}>
                {userRole === "LoggedInUser" ? 
                    <Box onClick={handleRouteToUpdatePage}sx={{width: '350px', height: '350px'}}>
                        {userProfileImage ? <img src={`${userProfileImage}`} alt="" className="uploaded-image" style={{maxWidth: '100%', maxHeight: '100%'}}/> 
                        : <img src={CircleImage} alt="Circle" className="uploaded-image" style={{maxWidth: '100%', maxHeight: '100%'}}/>}                                    
                    </Box> : 
                     <Box sx={{width: '350px', height: '350px'}}>
                     {userProfileImage ? <img src={`${userProfileImage}`} alt="" className="uploaded-image" style={{maxWidth: '100%', maxHeight: '100%'}}/> 
                     : <img src={CircleImage} alt="Circle" className="uploaded-image" style={{maxWidth: '100%', maxHeight: '100%'}}/>}                                    
                    </Box> 
                    }
                    {userRole === "LoggedInUser" ? 
                        <Box sx={{textAlign: 'center'}}>
                            <Button onClick={handleRouteToUpdatePage} sx={{backgroundColor: '#4681f4', color: 'white'}}>Update Profile</Button>
                        </Box>
                    : ""}
                </Box> 
               

                <Container style={{marginLeft: '25%', display: 'flex', flexDirection: 'column', gap: '100px'}}>
                    <Box>
                        <Typography variant="h4">
                            Profile Summary
                        </Typography>      
                        <Box sx={{border: 1, height: '100%', borderRadius: '5px'}}>
                            <Typography sx={{padding: '15px'}}>
                                {profileDesc}
                            </Typography>
                        </Box>             
                    </Box>
                    <Box>
                        <Typography variant="h4" >
                            Skills
                        </Typography>
                        {skills && skills.map((item, index) => (
                            <span key={index}>                      
                                    <Button sx={[
                                        {                              
                                            backgroundColor: `white`,
                                            color: 'black',                         
                                            border: '1px solid black',                                    
                                            marginTop: '20px',
                                            marginRight: '15px'
                                        },
                                        {
                                            '&:hover': {                                          
                                            backgroundColor: 'lightgrey',
                                            },
                                        },
                                        ]}>                                                
                                            {item.text}                                               
                                    </Button>
                            </span>
                        ))}   
                    </Box>
                    <Box>
                        <Typography variant="h4" >
                            Connect with me
                        </Typography>
                        
                        {media && media.map((item, index) => (
                                    <span key={index}>                                
                                        <Link to={item.mediaURL}>
                                        
                                            <Button sx={[
                                                { 
                                                    color: `${item.textColor}`, 
                                                    backgroundColor: `${item.backgroundColor}`,
                                                    marginTop: '20px',
                                                    marginRight: '15px'
                                                },
                                                {
                                                    '&:hover': {                                          
                                                    backgroundColor: 'lightgrey',
                                                    },
                                                },
                                                ]}>                                                
                                                    {item.text}&nbsp;{item.iconType && iconComponents[item.iconType]}                                                
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