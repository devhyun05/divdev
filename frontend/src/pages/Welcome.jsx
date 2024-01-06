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
                            portfolio builder !
                        </Typography>
                        <Typography sx={{marginTop: '5%', marginBottom: '5%'}}>
                            Build blog, profile, projects in one website
                        </Typography>
                        <Box>
                            <Link to="/login">
                                <Button sx={{backgroundColor: '#4681f4', color: 'white', width: '35%'}}>Get started</Button>
                            </Link>
                            <Link to="/tester_blog">
                                <Button sx={{backgroundColor: '#4681f4', color: 'white', width: '35%', marginLeft: '4%'}}>View Demo</Button>
                            </Link>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{border: '1px solid white', borderRadius: '5px'}}>
                <iframe src="https://www.veed.io/embed/aa0c1440-9ceb-4833-8628-df474c963578" width="560" height="315" frameBorder="0" title="Divdev demo" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen={true}></iframe>
                </Box>               
                
            </Box>
           
        </>
    )
}

export default Welcome; 