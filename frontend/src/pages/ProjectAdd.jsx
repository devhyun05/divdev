import "../App.css";
import { useState,  useContext} from 'react'; 
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import LoginContext from '../context/LoginContext'; 
import Container from '@mui/material/Container'; 
import Box from '@mui/material/Box'; 
import Typography from '@mui/material/Typography'; 
import TextField from '@mui/material/TextField'; 
import Button from '@mui/material/Button'; 

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const backend = process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://www.divdev.pro"; 

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

const ProjectUpdate = () => {

    const { userName } = useContext(LoginContext); 
   

    const [image, setImage] = useState("");
    const [projectName, setProjectName] = useState("");
    const [projectDesc, setProjectDesc] = useState("");
    const [projectLink, setProjectLink] = useState(""); 
    const [imageName, setImageName] = useState('');
    const navigate = useNavigate(); 



    const handleSubmit = async (e) => {
        try {            
            const formData = new FormData();
            
            formData.append("userName", userName); 
            formData.append("image", image);
            formData.append("projectName", projectName);
            formData.append("projectDesc", projectDesc); 
            formData.append("projectLink", projectLink); 

            await fetch(`${backend}/${userName}/projectadd/add-project`, {
                method: 'POST',
                body: formData 
            })

            navigate(`/${userName}/project`);
          
        } catch (error) {
            console.error("Error: ", error); 
        }

    }
    
    const handleProjectName = (e) => {
        setProjectName(e.target.value); 
    }; 

    const handleProjectDesc = (e) => {
        setProjectDesc(e.target.value); 
    };

    const handleProjectLink = (e) => {
        setProjectLink(e.target.value); 
    }; 

    const handleImageChange = (event) => {
         setImage(event.target.files[0]);
         setImageName(event.target.files[0].name);
    }

    return(
        <>
            <Container >               
                <Box sx={{display: 'flex', flexDirection:'column', alignItems: 'center', color: 'white', gap: '30px', borderRadius: '10px', padding: '50px 20px', width: '100%'}}>
  
                    <Box sx={{width: '50%'}}>
                        <Typography variant="h5" className="responsive-color">
                            Project Image                            
                        </Typography>
                        <input type="file" id="file"  onChange={handleImageChange}  />    
                        <label for="file" class="project-file-label" style={{color: 'white', 
                                                                             textAlign: 'center', 
                                                                             height: '40px', 
                                                                             width: '250px', 
                                                                             backgroundColor: '#025bee',
                                                                             fontSize: '18px',
                                                                             display: 'flex',
                                                                             justifyContent: 'center',
                                                                             alignItems: 'center',
                                                                             marginBottom: '3%'
                                                                             }}>
                        {imageName ? (
                            imageName
                            ) : (
                            <>
                                <AddPhotoAlternateIcon />
                                Choose Image
                            </>
                            )}           
                        </label>
              
                    </Box>

                    <Box sx={{width: '50%'}}>
                        <Typography variant="h5" className="responsive-color">
                            Project Name
                        </Typography>
                        <CssTextField 
                        sx={{width: '100%'}}
                        name="project_name"
                      
                        onChange={handleProjectName}
                        InputProps={{
                            style: {
                                color: 'white'
                            },                            
                        }}/>
                    </Box>

                    <Box sx={{width: '50%'}}>
                        <Typography variant="h5" className="responsive-color">
                            Project Description
                        </Typography>
                        <CssTextField 
                        sx={{width: '100%'}}
                        multiline
                        name="project_desc"
                  
                        onChange={handleProjectDesc}
                        InputProps={{
                            style: {
                                color: 'white'
                            },                            
                        }}/>
                    </Box>

                    <Box  sx={{width: '50%'}}>
                        <Typography variant="h5" className="responsive-color">
                            Project Link
                        </Typography>
                        <CssTextField
                        sx={{width: '100%'}}
                        name="project_link"
                
                        onChange={handleProjectLink}
                        InputProps={{
                            style: {
                                color: 'white'
                            },                            
                        }}/>
                    </Box>

          
                    <Box >                     
                        <Button sx={{backgroundColor: '#4681f4', color: 'white', marginTop: '5%', width: '100%'}}
                                    onClick={handleSubmit}>
                            Add project 
                        </Button>   
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default ProjectUpdate; 