import { useState, useEffect, useContext } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom'; 
import LoginContext from '../context/LoginContext'; 
import Box from '@mui/material/Box'; 
import Typography from '@mui/material/Typography'; 
import Button from '@mui/material/Button'; 
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import UpdateIcon from '@mui/icons-material/Update';

const backend = 'http://localhost:3000';

const PostDetails = () => {
    const { userName } = useContext(LoginContext); 
    const [postDetails, setPostDetails] = useState([]); 
    const navigate = useNavigate(); 
    const location = useLocation(); 

    useEffect(()=>{
        fetchPostInfo();
    }, []); 

    const fetchPostInfo = async () => {
        try {
            const path = decodeURIComponent(location.pathname); 
            const title = path.split("/").pop();
            
            const response = await fetch(`${backend}/${userName}/post/get-post-details`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title: title}) 
            }); 

            const blogDetails = await response.json();

            setPostDetails(blogDetails); 

        } catch (error) {
            console.error(error); 
        }
    };
    
    const handleUpdate = () => {
        const path = decodeURIComponent(location.pathname); 
        const title = path.split("/").pop();
        navigate(`/${userName}/${title}/postupdate`);
    }; 

    const handleDelete = async () => {
        try {
            const path = decodeURIComponent(location.pathname); 
            const title = path.split("/").pop();

            await fetch(`${backend}/${userName}/post/delete-post`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title: title})
            }); 

            navigate(`/${userName}`);
        } catch (error) {
            console.error(error); 
        }
    } 

    return (
        <>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: '3%', marginRight: '10%'}}>
                <Button style={{backgroundColor: '#4681f4', color: 'white'}} onClick={handleUpdate} >Update &nbsp;<UpdateIcon/></Button>
                &nbsp;&nbsp;&nbsp;
                <Button style={{backgroundColor: '#4681f4', color: 'white'}} onClick={handleDelete}>Delete &nbsp;<HighlightOffIcon/></Button>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white'}}>
                <Box sx={{width: '50%', textAlign: 'left'}}>
                    <Typography variant="h3" sx={{fontWeight: 'bold'}}>
                        {postDetails.title} 
                    </Typography>
                </Box>
                <Box sx={{width: '50%', textAlign: 'left', marginTop: '1%', color: '#C0C0C0'}}>
                    <Typography>
                        {postDetails.userName}, {postDetails.postTime}
                    </Typography>
                </Box>
                <Box sx={{ width: '50%', textAlign: 'left', marginTop: '2%'}}>
                    <Typography  dangerouslySetInnerHTML={{ __html: postDetails.postContent }} />
                </Box>
            </Box>
        </>
    )
}

export default PostDetails; 
