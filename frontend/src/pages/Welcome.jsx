import '../App.css';
import { Link } from 'react-router-dom'; 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; 
import Button from '@mui/material/Button'; 

const Welcome = () => {
    return (
        <>
            <Box sx={{display: 'flex', marginTop: '10%'}}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', height: '60%', marginLeft: '5%'}}> 
                    <Box className="box-container" sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography variant="h2">
                            Blog style 
                        </Typography>
                        <Typography variant="h2">
                            portfolio builder
                        </Typography>
                        <Typography sx={{marginTop: '5%', marginBottom: '5%'}}>
                            Build blog, profile, projects in one website
                        </Typography>
                        <Box>
                            <Link to="/login">
                                <Button sx={{backgroundColor: '#4681f4', color: 'white', width: '35%'}}>Get started</Button>
                            </Link>
                            <Button sx={{backgroundColor: '#4681f4', color: 'white', width: '35%', marginLeft: '4%'}}>View Demo</Button>
                        </Box>
                    </Box>
                </Box>
                <Box >
                <iframe width="560" height="315" src="https://www.youtube.com/embed/cblMH5fxGa0?si=jxXDmBIQ9OPnSHQG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    
                </Box>               
                
            </Box>
           
        </>
    )
}

export default Welcome; 