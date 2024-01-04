import { useState, useEffect, useContext } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom'; 
import LoginContext from '../context/LoginContext'; 
import Box from '@mui/material/Box'; 
import Typography from '@mui/material/Typography'; 
import Button from '@mui/material/Button'; 
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import UpdateIcon from '@mui/icons-material/Update';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton'; 

const backend = process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://www.divdev.pro"; 

const PostDetails = () => {
    const { userName, userRole } = useContext(LoginContext); 
    const [postDetails, setPostDetails] = useState([]); 

    const [noOfLikes, setNoOfLikes] = useState(0); 
    const [countForRender, setCountForRender] = useState(0); 
    const [blogPostId, setBlogPostId] = useState(""); 
    const [userClickedLike, setUserClickedLike] = useState(false);
    const navigate = useNavigate(); 
    const location = useLocation(); 

    useEffect(()=>{      
        fetchPostInfo();
    }, [noOfLikes]);  // eslint-disable-line react-hooks/exhaustive-deps



    const fetchPostInfo = async () => {
        try {
            const path = decodeURIComponent(location.pathname); 
            const postId = path.split("/").pop();
            setBlogPostId(postId); 

            const response = await fetch(`${backend}/${userName}/post/get-post-details`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({postId: postId, username: userName}) 
            }); 

            const blogDetails = await response.json();
            
            setPostDetails(blogDetails.post);

            setNoOfLikes(parseInt(blogDetails.post.noOfLikes)); 
  
            for (let i = 0; i < blogDetails.post.userListClickLike.length; i++) {
                if (blogDetails.post.userListClickLike[i].userId === blogDetails.userId) {                  
                    setUserClickedLike(true);             
                }
            }
        } catch (error) {
            console.error(error); 
        }
    };
    
    const handleUpdate = () => {
        navigate(`/${userName}/${blogPostId}/postupdate`);
    }; 

    const handleDelete = async () => {
        try {

            await fetch(`${backend}/${userName}/post/delete-post`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({postId: blogPostId})
            }); 

            navigate(`/${userName}`);
        } catch (error) {
            console.error(error); 
        }
    } 

    const increaseLike = async () => {
        const response = await fetch(`${backend}/${userName}/post/update-post-like`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({postId: blogPostId, username: userName, noOfLikes: noOfLikes + 1})
        });     

        const currLikes = await response.json();

        setNoOfLikes(currLikes);
    };
    
    const decreaseLike = async () => {
        const response = await fetch(`${backend}/${userName}/post/update-post-like`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({postId: blogPostId, username: userName, noOfLikes: noOfLikes - 1})
        }); 

        const currLikes = await response.json();

        setNoOfLikes(currLikes);
    };

    const handleFillHeart = async () => {
        if (userClickedLike) { 
            setUserClickedLike(false);
            decreaseLike();
        } else {
            setUserClickedLike(true);
            increaseLike();
        }     
    }; 



    return (
        <>

            <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: '3%', marginRight: '10%'}}>
            {userRole === "LoggedInUser" ? 
                <>
                <Button style={{backgroundColor: '#4681f4', color: 'white'}} onClick={handleUpdate} >Update &nbsp;<UpdateIcon/></Button>
                &nbsp;&nbsp;&nbsp;
                <Button style={{backgroundColor: '#4681f4', color: 'white'}} onClick={handleDelete}>Delete &nbsp;<HighlightOffIcon/></Button>
                </>
                : ""}
            </Box>

            <Box>
                <IconButton sx={{position: 'fixed', display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: '2%', marginTop: '15%'}}
                            onClick={handleFillHeart}>
                    {userClickedLike ?
                                <FavoriteIcon sx={{fontSize: '50px', color: 'red'}}/>   
          
                                :
                                <FavoriteBorderIcon sx={{fontSize: '50px', color: 'red'}}/>
                              
                    }
                    <Typography variant="h5" sx={{color: 'white'}}>{noOfLikes}</Typography>
                </IconButton>
            </Box>

            {postDetails &&
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white'}}>
                <Box sx={{width: '50%', textAlign: 'left'}}>
                    <Typography variant="h3" sx={{fontWeight: 'bold'}} className="responsive-color" >
                        {postDetails.title} 
                    </Typography>
                </Box>
                <Box sx={{width: '50%', textAlign: 'left', marginTop: '1%', color: '#C0C0C0'}}>
                    <Typography >
                        {postDetails.userName}, {postDetails.postTime}
                    </Typography>
                </Box>
                <Box sx={{ width: '50%', textAlign: 'left', marginTop: '2%'}} className="responsive-color" >
                    <Typography  dangerouslySetInnerHTML={{ __html: postDetails.postContent }} />
                </Box>
            </Box>
            }
        </>
    )
}

export default PostDetails; 
