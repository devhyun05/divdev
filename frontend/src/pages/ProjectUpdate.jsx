import "../App.css";
import { useState, useEffect, useContext} from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import LoginContext from '../context/LoginContext'; 
import Container from '@mui/material/Container'; 
import Box from '@mui/material/Box'; 
import Typography from '@mui/material/Typography'; 
import TextField from '@mui/material/TextField'; 
import Button from '@mui/material/Button'; 
import ClearIcon from '@mui/icons-material/Clear';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const backend = "http://localhost:8000" 

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
    const [formData, setFormData] = useState({
        // prevent uncontrolled error
        project_image: '',
        project_name: '',
        project_desc: '',
        project_link: ''
    })
    const [projectList, setProjectList] = useState([]); 
    const [countForRender, setCountForRender] = useState(0); 
    const [displayUpdateItemBtn, setDisplayUpdateItemBtn] = useState(false); 
    const [image, setImage] = useState("");
    const [imageArray, setImageArray] = useState([]); 
    const [imageFiles, setImageFiles] = useState([]); 
    const [imageName, setImageName] = useState('');
    const navigate = useNavigate(); 



    useEffect(()=> {
        fetchProjects(); 
        
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const fetchProjects = async () => {
        try {
            const response = await fetch(`${backend}/${userName}/project/get-project`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: userName})
            })
            const projects = await response.json(); 
            setProjectList(projects); 
        } catch (error) {
            console.error("Error: ", error); 
        }
    }

    const handleChange = (e) => {     
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSetProject = (e) => {
        e.preventDefault(); 
      
        setProjectList([...projectList, formData]); 
        setImageArray([...imageArray, image]); 
        setFormData({
            project_image: '',
            project_name: '',
            project_desc: '',
            project_link: ''    
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();    
        try {            
            const uploadPromises = imageArray.map(async (image) => {          
                const formData = new FormData();   
                formData.append("image", image);
                const response = await fetch(`${backend}/${userName}/projectupdate/upload-image`, {
                    method: 'PUT',
                    body: formData, 
                });
                const imageLink = await response.json(); 
                setImageFiles((prevImages) => [...prevImages, imageLink]);

                formData.delete("image");

                return imageLink; // Return the imageLink for Promise.all
            });
            
            const uploadedImages = await Promise.all(uploadPromises);
            
            for (let i = 0; i < projectList.length; i++) {
                projectList[i].project_image = uploadedImages[i]; 
            }

            console.log(projectList); 
            await fetch(`${backend}/${userName}/projectupdate/update-project`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: userName,
                    projects: projectList,
                })
            })

            navigate(`/${userName}/project`);
          
        } catch (error) {
            console.error("Error: ", error); 
        }

    }
    
    const handleUpdateProject = (item) => {
        setFormData({
            project_name: item.project_name, 
            project_desc: item.project_desc,
            project_link: item.project_link
        })
        setDisplayUpdateItemBtn(true); 
        setCountForRender(countForRender + 1);
    }
    
    const handleConfirmUpdate = (e) => {
        e.preventDefault();
   
        for (let i = 0; i < projectList.length; i++) {
            if (projectList[i].project_name === formData.project_name) {
                projectList[i] = formData;
            }
        }
     
        setDisplayUpdateItemBtn(false);
        setCountForRender(countForRender + 1);
    }
    
    const handleRemoveProject = (item) => {
        for (let i = 0; i < projectList.length; i++) {
            if(projectList[i].project_name === item.project_name) {
                projectList.splice(i, 1);
                setCountForRender(countForRender + 1);
            }
        }
    }
    
    const handleImageChange = (event) => {
         setImage(event.target.files[0]);
         setImageName(event.target.files[0].name);
    }
    return(
        <>
            <Container sx={{display: 'flex', flexDirection: 'row'}}>
                <Box  sx={{width: '50%',  marginTop: '5%'}}>
                    <Typography variant="h5" className="responsive-color" sx={{marginLeft: '14%', marginBottom: '5%'}}>
                        Displaying Order
                    </Typography>
                    <Box
                    sx={{border: 1, borderColor: 'white', width: '60%', height: '100%', color: 'white', textAlign: 'left'}}
         
                    >
                    {projectList && 
                        projectList.map((item, index)=>(
                            <div key={index}>
                                    <Button sx={{backgroundColor: '#4681f4', color: 'white', width: '60%'}}>
                                        {item.project_name}
                                    </Button>
                                    <Button onClick={() => handleUpdateProject(item)} sx={{color: 'white'}}><ChangeCircleIcon/></Button>
                                    <Button onClick={()=> handleRemoveProject(item)} sx={{color: 'white'}}><ClearIcon/> </Button>
                                <hr/>
                            </div>
                        ))
                    }
                    </Box>
                    <Link>
                        <Button sx={{backgroundColor: '#4681f4', color: 'white', margin: '5% 0 0 5%', width: '50%'}}
                                onClick={handleSubmit}>
                            Finish Update 
                        </Button>  
                    </Link>
                </Box>
                <Box  sx={{display: 'flex', flexDirection:'column', color: 'white', gap: '30px',borderRadius: '10px', padding: '50px 20px', width: '50%'}}>
  
                    <Box>
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

                    <Box>
                        <Typography variant="h5" className="responsive-color">
                            Project Name
                        </Typography>
                        <CssTextField 
                        sx={{width: '100%'}}
                        name="project_name"
                        value={formData.project_name}
                        onChange={handleChange}
                        InputProps={{
                            style: {
                                color: 'white'
                            },                            
                        }}/>
                    </Box>

                    <Box>
                        <Typography variant="h5" className="responsive-color">
                            Project Description
                        </Typography>
                        <CssTextField 
                        sx={{width: '100%'}}
                        multiline
                        name="project_desc"
                        value={formData.project_desc}
                        onChange={handleChange}
                        InputProps={{
                            style: {
                                color: 'white'
                            },                            
                        }}/>
                    </Box>

                    <Box>
                        <Typography variant="h5" className="responsive-color">
                            Project Link
                        </Typography>
                        <CssTextField
                        sx={{width: '100%'}}
                        name="project_link"
                        value={formData.project_link}
                        onChange={handleChange}
                        InputProps={{
                            style: {
                                color: 'white'
                            },                            
                        }}/>
                    </Box>

          
                    <Box sx={{textAlign: 'center'}}>
                        {!displayUpdateItemBtn ? 
                            <Button sx={{backgroundColor: '#4681f4', color: 'white', marginTop: '5%', width: '50%'}}
                                    onClick={handleSetProject}>
                                Add project 
                            </Button>   
                            :
                            <Button sx={{backgroundColor: '#4681f4', color: 'white', marginTop: '5%', width: '50%'}}
                                    onClick={handleConfirmUpdate}>
                                Update Project
                            </Button>
                        }
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default ProjectUpdate; 