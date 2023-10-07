import { useState, useEffect, useRef } from 'react'; 
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container'; 
import Box from '@mui/material/Box'; 
import Typography from '@mui/material/Typography'; 
import TextField from '@mui/material/TextField'; 
import Button from '@mui/material/Button'; 
import Card from '@mui/material/Card'; 
import Draggable from 'react-draggable'; 


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
    const boxRef = useRef(null); 
    const [boxBounds, setBoxBounds] = useState({ top: 0, left: 0, right: 0, bottom: 0}); 
    const [formData, setFormData] = useState({})
    const [projectList, setProjectList] = useState([]); 

    useEffect(()=>{
        updateBounds();
        window.addEventListener('resize', updateBounds); 
        return () => window.removeEventListener('resize', updateBounds); 
    }, [])

    const updateBounds = () => {
        const boxRect = boxRef.current.getBoundingClientRect(); 
        setBoxBounds({
            top: 300,
            left: 0, 
            right: 0, 
            bottom: 300, 
        });
    }; 

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProjectList([...projectList, formData]); 
        console.log(projectList);
    }
    return(
        <>
            <Container sx={{display: 'flex', flexDirection: 'row'}}>
                <Box sx={{width: '50%',  marginTop: '5%'}}>
                    <Typography variant="h5" color="white" sx={{marginLeft: '14%', marginBottom: '5%'}}>
                        Displaying Order
                    </Typography>
                    <Box
                    ref={boxRef}
                    sx={{border: 1, borderColor: 'white', width: '60%', height: '100%', color: 'white', textAlign: 'center'}}
                    >
                    {projectList && 
                        projectList.map((item, index)=>(
                            <div key={index}>
                                <Draggable bounds={{top: 300, left: 300, right: 300, bottom: 300}} >
                                    <Card>
                                        <Button sx={{backgroundColor: '#3e8e41', color: 'white', width: '100%'}}>{item.project_name}</Button>
                                    </Card>
                                </Draggable>
                                <hr/>
                            </div>
                        ))
                    }
                    </Box>
                    <Link>
                        <Button sx={{backgroundColor: '#3e8e41', color: 'white', margin: '5% 0 0 5%', width: '50%'}}>
                            Finish Update 
                        </Button>  
                    </Link>
                </Box>
                <Box component="form" onSubmit={handleSubmit} sx={{display: 'flex', flexDirection:'column', color: 'white', gap: '30px',borderRadius: '10px', padding: '50px 20px', width: '50%'}}>
                    
                    <Box>
                        <Typography variant="h5">
                            Project Image
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="h5">
                            Project Name
                        </Typography>
                        <CssTextField 
                        sx={{width: '100%'}}
                        name="project_name"
                        onChange={handleChange}
                        InputProps={{
                            style: {
                                color: 'white'
                            },                            
                        }}/>
                    </Box>

                    <Box>
                        <Typography variant="h5">
                            Project Description
                        </Typography>
                        <CssTextField 
                        sx={{width: '100%'}}
                        multiline
                        name="project_description"
                        onChange={handleChange}
                        InputProps={{
                            style: {
                                color: 'white'
                            },                            
                        }}/>
                    </Box>

                    <Box>
                        <Typography variant="h5">
                            Project Link
                        </Typography>
                        <CssTextField
                        sx={{width: '100%'}}
                        name="project_link"
                        onChange={handleChange}
                        InputProps={{
                            style: {
                                color: 'white'
                            },                            
                        }}/>
                    </Box>

          
                    <Box sx={{textAlign: 'center'}}>
                        <Button sx={{backgroundColor: '#3e8e41', color: 'white', marginTop: '5%', width: '50%'}} type="submit">Add project </Button>   
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default ProjectUpdate; 