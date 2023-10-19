import '../App.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; 
import Button from '@mui/material/Button'; 
import SampleImage from '../assets/img/sample-image.jpg'
const Welcome = () => {
    return (
        <>
            <Box sx={{display: 'flex'}}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', height: '60%'}}> 
                    <Box className="box-container" sx={{display: 'flex', flexDirection: 'column', color: 'white'}}>
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
                            <Button sx={{backgroundColor: '#4681f4', color: 'white', width: '35%'}}>Get started</Button>
                            <Button sx={{backgroundColor: '#4681f4', color: 'white', width: '35%', marginLeft: '4%'}}>View Demo</Button>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{width: '50%'}}>
                    <img src={SampleImage} style={{width: '70%', height: '40%'}} alt=""/>
                </Box>
            </Box>
        </>
    )
}

export default Welcome; 