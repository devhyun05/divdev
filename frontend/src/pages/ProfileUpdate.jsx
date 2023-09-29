import React, { useState, useRef, useContext } from 'react';
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
    const { userName } = useContext(LoginContext); 
    const inputRef = useRef(null);
    
    const [image, setImage] = useState("");
    const [searchItem, setSearchItem] = useState([]); 
    const [inputValue, setInputValue] = useState('');
    const [contact, setContact] = useState(''); 

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
        navigate(`${userName}/profile`);
    }

    const searchSkills = (value) => {
        setInputValue(value)
        fetch(`${backend}/${userName}/profileupdate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({keyword: value}) 
        }).then(response => response.json())
        .then(data =>{   
            console.log(data)         
            setSearchItem(data); 
        })
        .catch(err => {
            console.log(err);
        })
        
    }

    const handleChange = (event) => {
        setContact(event.target.value); 
    }

    const handleLinkAdd = (event) => {
        if (contact === 'Github') {
            
        }
    }

    return (
        <>
            <Container style={{display: 'flex', flexDirection: 'row'}}>
                <Box>
                    <Box onClick={handleImageClick} sx={{width: '300px', height: '300px'}}>
                        {image ? <img src={URL.createObjectURL(image)} alt="" className="uploaded-image"/> : <img src={CircleImage} alt="Circle" className="uploaded-image"/>}
                        <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />                    
                    </Box>
                    <Box sx={{marginTop: '30%', paddingLeft: '33%'}}>
                        <Button style={{backgroundColor: '#3e8e41', color: 'white'}} onClick={handleNavigate}>Finish update</Button>
                    </Box>
                </Box> 
               
                <Container style={{marginLeft: '25%', display: 'flex', flexDirection: 'column', gap: '20px'}}>
                    <Box >
                        <Typography variant="h4" color="white">
                            Profile Summary
                        </Typography>       
                        <CssTextField
                        id="outlined-multiline-static"
                        multiline
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
                            id="size-small-outlined"
                            size="medium"
                            options={searchItem}
                            inputValue={inputValue}
                            onInputChange={searchSkills}         
                            renderOption={(props, option)=> (                                
                                <div {...props} style={{ whiteSpace: 'pre-line' }}>
                                    {option}
                                </div>
                            )}
                            renderInput={(params) => (
                                <CssTextField
                                    {...params}
                                    sx={{width: '100%'}}                                   
                                    placeholder="Skills"
                                />
                            )}
                            
                            />
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
                                style={{color: '#E0E3E7'}}
                            >       
                                <MenuItem value={"Github"}>Github</MenuItem>
                                <MenuItem value={"Linkedin"}>Linkedin</MenuItem>
                                <MenuItem value={"Instagram"}>Instagram</MenuItem>
                                <MenuItem value={"Facebook"}>Facebook</MenuItem>
                                <MenuItem value={"Twitter"}>Twitter</MenuItem>
                                <MenuItem value={"Youtube"}>YouTube</MenuItem>
                                
                            </Select>
                        </FormControl>
                        {contact ? 
                                <CssTextField
                                    id="outlined-multiline-static"                            
                                    sx={{width: '100%', marginTop: '2%'}}
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
                        
                    </Box>
                </Container>
            </Container>
        </>
    )
}

export default ProfileUpdate; 