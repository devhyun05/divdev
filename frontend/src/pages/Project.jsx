import "../App.css";
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'; 
import LoginContext from '../context/LoginContext'; 
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'; 
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; 

const backend = process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://www.divdev.pro"; 

const Project = () => {
    const { isLoggedIn, userName, userRole } = useContext(LoginContext); 
    const [projectList, setProjectList] = useState([]); 
    const [countForRender, setCountForRender] = useState(0); 

    useEffect(()=>{
        fetchProject(); 
    }, [countForRender]);  // eslint-disable-line react-hooks/exhaustive-deps

    const fetchProject = async () => {
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

    const handleDeleteProject = async (image) => {
        try {
             await fetch(`${backend}/${userName}/project/delete-project`, {
                method: 'DELETE', 
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({username: userName, projectImage: image})
            });

          
            setCountForRender(countForRender + 1); 

        } catch(error) {
            console.error("Error: ", error);
        }
    }; 

    return (
        <>
        <Container>
            {userRole === "LoggedInUser" ? 
            <Box sx={{textAlign: 'right', marginTop: '30px'}}>
                <Link to={`/${userName}/projectadd`}>
                    <Button sx={{backgroundColor: '#4681f4', color: 'white'}}>Add Project</Button>     
                </Link>
            </Box>
            : ""}
            <Box sx={{display: 'flex', flexDirection: 'column', marginTop: '5%', gap: '50px', color: 'white'}}>
                {projectList && projectList.map((item, index) => (
                    <Box key={index} sx={{display: 'flex', flexDirection: 'row'}}>     
                        <Box className="outside-box">                 
                            <img src={item.project_image} alt="" className="project-image" /> 
                            <Box className="overlay">
                                <Box className="content">
                                    <Link to={`https://${item.project_link}`} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                                        Link to website
                                    </Link>
                              
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '10%', gap: '20px'}}>
                            <Typography variant="h5" className="responsive-color">
                                Project Name: {item.project_name} 
                            </Typography>
                            <Typography variant="h6" className="responsive-color">
                                {item.project_desc}
                            </Typography>
                            {isLoggedIn &&
                            <Box sx={{marginTop: '10%'}}>
                                <Button style={{width: '40%', backgroundColor: '#4681f4', color: 'white', marginRight: '10px'}} >Update </Button>
                                <Button style={{width: '40%', backgroundColor: '#4681f4', color: 'white'}} 
                                          onClick={() => handleDeleteProject(item.project_image)}>
                                            Delete 
                                </Button>
                            </Box>
                            }
                        </Box>
                    </Box>
                ))}
                
            </Box>
        </Container>
        </>
    )
}

export default Project; 