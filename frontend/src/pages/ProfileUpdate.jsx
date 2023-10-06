import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { styled } from '@mui/material/styles';
import LoginContext from '../context/LoginContext'; 
import CircleImage from '../assets/img/circle.png'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; 
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete'; 
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'; 
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ClearIcon from '@mui/icons-material/Clear';
import { InputAdornment } from '@mui/material';

const backend = 'http://localhost:3000';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#E0E3E7',
      },
      '&:hover fieldset': {
        borderColor: '#B2BAC2',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6F7E8C',
      },
    },
});

  
const ProfileUpdate = () => {
    const { userName, userProfileImage, setUserProfileImage } = useContext(LoginContext); 
    const inputRef = useRef(null);

    
    const [image, setImage] = useState("");
    const [searchItem, setSearchItem] = useState([]); 
    const [input, setInput] = useState('');
    const [skill, setSkill] = useState([]); 
    const [contact, setContact] = useState(''); 
    const [media, setMedia] = useState([]); 
    const [userProfileDesc, setUserProfileDesc] = useState(""); 
    const [url, setURL] = useState(""); 
    const [countForRender, setCountForRender] = useState(0); 
    const navigate = useNavigate(); 

    useEffect(()=>{
        console.log("called");
        fetchProfile(); 
    }, [])
    
    const fetchProfile = async () => {      
        try {
            console.log("called");
            await fetch(`${backend}/${userName}/profile/get-profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: userName})
            }).then(response => response.json())
            .then(data => {
                console.log(data);
                setUserProfileDesc(data.profileDesc);
                if (data.userSkills.length > 0) {
                    setSkill(data.userSkills)
                }
                if (data.userMedia.length > 0) {
                    setMedia(data.userMedia);
                }
            }).catch(err => {
                console.log ('Error: ', err); 
            })
        } catch (error) {
            console.log('Error: ', error); 
        }
    }

    const handleSubmit = async () => {

        try {
            console.log(image);
            if (image !== "") {
                const formData = new FormData(); 
                formData.append('image', image); 
                formData.append('username', userName); 
            
                await fetch(`${backend}/${userName}/profileupdate/update-image`, {
                    method: 'PUT',
                    body: formData
                }).then(response => response.json())
                .then(data => {
                    setUserProfileImage(data.userImage); 
                }).catch(err => {
                    console.error('Error', err); 
                })
            }
           await fetch(`${backend}/${userName}/profileupdate/update-profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: userName, 
                    profileDesc: userProfileDesc, 
                    userSkills: skill, 
                    userMedia: media,
                })
            })

            navigate(`/${userName}/profile`);
        } catch (error) {
            console.error('Error: ', error);
        }

    }

    const handleImageClick = () => {
        inputRef.current.click();
    }

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    }

    const handleProfileDescChange = (event) => {
        setUserProfileDesc(event.target.value);
    }

    const handleSearchSkill = (event, value) => {
        setInput(value);
        fetch(`${backend}/${userName}/profileupdate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({keyword: input})
            
        }).then(response => response.json())
        .then(data =>{           
            setSearchItem(data);
        })
        .catch(err => {            
            console.log(err);
        })
        
    }

    const handleSkillClick = () => {
        console.log(input);
        setSkill([...skill, {text: input}]);     
    }

    const handleChange = (event) => {
        setContact(event.target.value); 
    }

    const handleURLChange = (event) => {
        setURL(event.target.value); 
    }

    const handleSkillRemove = (item) => {        
        for (let i = 0; i < skill.length; i++) {         
            if (skill[i].text === item.text) {           
                skill.splice(i, 1); 
                setCountForRender(countForRender + 1);                
            }
        }
    }
    const handleMediaRemove = (item) => {
        console.log(item);
        for (let i = 0; i < media.length; i++) {
            if (media[i].mediaURL === item.mediaURL) {
                media.splice(i, 1); 
                console.log(media);
                setCountForRender(countForRender + 1); 
            
            }
        }
    
    }

    const iconComponents = {
        GitHubIcon: <GitHubIcon/>, 
        LinkedinIcon: <LinkedInIcon/>, 
        InstagramIcon: <InstagramIcon/>, 
        FacebookIcon: <FacebookIcon/>, 
        TwitterIcon: <TwitterIcon/>,
        YouTubeIcon: <YouTubeIcon/> 
    }

    const handleLinkAdd = (event) => {; 
        if (contact === 'Github') {
            setMedia([...media, { text: 'Github', mediaURL: url, backgroundColor: 'black', textColor: 'white', iconType: 'GitHubIcon' }]);
        } else if (contact === 'Linkedin') {
            setMedia([...media, { text: 'Linkedin', mediaURL: url, backgroundColor: '#0366c3', textColor: 'white', iconType: 'LinkedinIcon' }]);
        } else if (contact === 'Instagram'){
            setMedia([...media, { text: 'Instagram', mediaURL: url, backgroundColor: '#ffb601', textColor: 'white', iconType: 'InstagramIcon' }]);
        } else if (contact === 'Facebook') {
            setMedia([...media, { text: 'Facebook', mediaURL: url, backgroundColor: '#6499E9', textColor: 'white', iconType: 'FacebookIcon' }]);
        } else if (contact === 'Twitter') {
            setMedia([...media, { text: 'Twitter', mediaURL: url, backgroundColor: '#9EDDFF', textColor: 'white', iconType: 'TwitterIcon' }]);
        } else if (contact === 'YouTube') {
            setMedia([...media, { text: 'YouTube', mediaURL: url, backgroundColor: '#ff0000', textColor: 'white', iconType: 'YouTubeIcon' }]);
        } 
    }

    return (
        <>
            <Container style={{display: 'flex', flexDirection: 'row', marginTop: '5%'}}>
                <Box>
                    <Box onClick={handleImageClick} sx={{width: '250px', height: '250px'}}>
                        {userProfileImage ? <img src={userProfileImage} alt="" className="uploaded-image"/> : <img src={CircleImage} alt="Circle" className="uploaded-image"/>}
                        <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />                    
                    </Box>
                    <Box sx={{marginTop: '50%', paddingLeft: '39%'}}>
                        <Button style={{backgroundColor: '#3e8e41', color: 'white'}} onClick={handleSubmit}>Finish update</Button>
                    </Box>
                </Box> 
               
                <Container style={{marginLeft: '25%', display: 'flex', flexDirection: 'column', gap: '50px'}}>
                    <Box>
                        <Typography variant="h4" color="white">
                            Profile Summary
                        </Typography>       
                        <CssTextField
                        id="outlined-multiline-static"
                        defaultValue={userProfileDesc}
                        multiline
                        onChange={handleProfileDescChange}
                        sx={{width: '100%'}}
                        InputProps={{
                            style: {
                                color: 'white'
                            },                            
                        }}
                        rows={5}
                        />
                                
                    </Box>
                    <Box>
                        <Typography variant="h4" color="white">
                            Skills
                        </Typography>
                        <Autocomplete 
                            options={searchItem}   
                            getOptionLabel={(option) => option.skills}
                            sx={{width: '100%'}}
                            inputValue={input}
                            onInputChange={handleSearchSkill}
                            renderInput={(params) => 
                            <CssTextField                           
                                {...params}                               
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleSkillClick}>
                                                <AddIcon style={{color: 'white'}}/>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    style:{
                                        color: 'white'
                                    }
                                }}    
                            />}                        
                        />
                        {skill && skill.map((item, index) => (
                            <span key={index}>                      
                                    <Button 
                                    onClick={() => handleSkillRemove(item)}
                                    sx={[
                                        {                              
                                            backgroundColor: `white`,
                                            marginTop: '20px',
                                            marginRight: '15px'
                                        },
                                        {
                                            '&:hover': {                                          
                                            backgroundColor: 'lightgrey',
                                            },
                                        },
                                        ]}>                                                
                                            {item.text}     <ClearIcon/>                                   
                                    </Button> 
                            </span>
                        ))}    
                    </Box>
                    <Box>
                        <Typography variant="h4" color="white">
                            Connect with me
                        </Typography>
                        <FormControl fullWidth style={{border: '1px solid #E0E3E7', borderRadius: '4px'}}>                       
                
                            <Select 
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleChange}         
                                defaultValue={""}                          
                                style={{color: '#E0E3E7'}}
                            >       
                                <MenuItem value={""}></MenuItem>
                                <MenuItem value={"Github"}>Github</MenuItem>
                                <MenuItem value={"Linkedin"}>Linkedin</MenuItem>
                                <MenuItem value={"Instagram"}>Instagram</MenuItem>
                                <MenuItem value={"Facebook"}>Facebook</MenuItem>
                                <MenuItem value={"Twitter"}>Twitter</MenuItem>
                                <MenuItem value={"YouTube"}>YouTube</MenuItem>                                
                            </Select>
                        </FormControl>
                        {contact ? 
                                <CssTextField
                                    id="outlined-multiline-static"                            
                                    sx={{width: '100%', marginTop: '2%'}}
                                    onChange={handleURLChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleLinkAdd}>
                                                    <AddIcon style={{color: 'white'}}/>
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        style: {
                                            color: 'white'
                                        },                            
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            color: 'white'
                                        }
                                    }}
                                    label="Enter the URL"
                                    rows={5}
                                />  
                        : ""}                                
                                {media && media.map((item, index) => (
                                    <span key={index}>                        
                                            <Button 
                                                 onClick={() => handleMediaRemove(item)}
                                                sx={[
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
                                                    {item.text}&nbsp;{item.iconType && iconComponents[item.iconType]}  <ClearIcon/>                              
                                            </Button>                                                                                                               
                                       
                 
                                    </span>
                                ))}                               
                    </Box>
                </Container>
            </Container>
        </>
    )
}

export default ProfileUpdate; 