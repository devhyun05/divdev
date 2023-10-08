import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'; 
import LoginContext from '../context/LoginContext'; 
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'; 
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; 
import PlaypalImage from '../assets/img/playpal.png'; 

const backend = 'http://localhost:3000';

const Project = () => {
    const { userName } = useContext(LoginContext); 
    const [projectList, setProjectList] = useState([]); 

    useEffect(()=>{
        fetchProject(); 
    }, []); 

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

    return (
        <>
        <Container>
            <Box sx={{textAlign: 'right', marginTop: '30px'}}>
                <Link to={`/${userName}/projectupdate`}>
                    <Button sx={{backgroundColor: '#3e8e41', color: 'white'}}>Update Project</Button>     
                </Link>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', marginTop: '5%', gap: '50px', color: 'white'}}>
                {projectList.map((item, index) => (
                    <Box key={index} sx={{display: 'flex', flexDirection: 'row'}}>
                        <img src={item.project_image} alt="" style={{width:'325px', height: '225px', borderRadius: '10px'}}/> 
                        <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '10%', gap: '20px'}}>
                            <Typography variant="h5">
                                Project Name: {item.project_name} 
                            </Typography>
                            <Typography variant="h6">
                                {item.project_desc}
                            </Typography>
                  
                        </Box>
                    </Box>
                ))}
                
            </Box>
        </Container>
        </>
    )
}

export default Project; 