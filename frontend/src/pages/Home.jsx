import "../App.css";
import React, { useState, useEffect, useContext } from 'react';
import LoginContext from '../context/LoginContext';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import AddIcon from '@mui/icons-material/Add';
const backend = 'http://localhost:3000';

const Home = () => {

    const { userName, userProfileImage, setUserProfileImage } = useContext(LoginContext);
    const [blogPostInfo, setBlogPostInfo] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchUserInfo();
        fetchBlogPost();
    }, []);

    const fetchUserInfo = async () => {

        try {
            await fetch(`${backend}/${userName}/set-image`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: userName })
            }).then(response => response.json())
                .then(data => {
                    setUserProfileImage(data.userImage);
                });
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    const fetchBlogPost = async () => {

        try {
            console.log("called");
            console.log(userName);
            const response = await fetch(`${backend}/${userName}/post/get-blog-post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: userName })
            })
            const posts = await response.json();

            setBlogPostInfo(posts);

        } catch (error) {
            console.error(error);
        }
    };

    const handleNavigatePostDetails = (postTitle) => {
        navigate(`/${userName}/${postTitle}`);
    };

    return (
        <>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', position: 'absolute', height: '92%', width: '10vw' }}>
                <Box sx={{ display: 'flex' , marginTop: '65%', marginBottom: '15%', fontWeight: 'bold'}}>
                    Category                   
                </Box>
                
                <Button sx={{textTransform: 'none'}}>
                    <Typography>React.js (2)</Typography>
                </Button>
                <Button sx={{ textTransform: 'none'}}>
                    <Typography>Node.js</Typography>
                </Button>
                <Button sx={{ textTransform: 'none'}}>
                    <Typography>MongoDB</Typography>
                </Button>
                <Button sx={{textTransform: 'none'}}>
                    <Typography>Express.js</Typography>
                </Button>


            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4%', marginRight: '5%' }}>
                <Link to={`/${userName}/addpost`}>
                    <Button sx={{ backgroundColor: '#4681f4', color: 'white', fontWeight: 'bold' }}>
                        Upload Post
                    </Button>
                </Link>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '50px', width: '75%', margin: '0 auto', color: 'white', marginLeft: '20%' }}>
                {blogPostInfo && blogPostInfo.map((item, index) => (

                    <div onClick={() => handleNavigatePostDetails(item.title)} className="post-container" key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ backgroundColor: '#1f1f23', borderRadius: '10px', }}>
                            <img src={item.thumbnailImage} alt="" style={{ width: '300px', height: '170px', borderRadius: '10px' }} />

                            <Typography variant="h5" sx={{ textAlign: 'center', maxWidth: '300px' }}>
                                {item.title}
                            </Typography>

                            <Typography sx={{ textAlign: 'center', color: '#C0C0C0', maxWidth: '300px' }} dangerouslySetInnerHTML={{ __html: item.postContent }} />

                            <br /><hr />
                        
                            <Box sx={{ display: 'flex', flexDirection: 'row', height: '30px', marginLeft: '10px', marginTop: '10px' }}>
                                <Avatar alt={`${userName}`} src={userProfileImage} style={{ width: '25px', height: '25px', marginLeft: '10px', marginRight: '10px' }} />
                                <Typography sx={{ marginRight: '80px' }}>{userName} </Typography>
                                <FavoriteIcon sx={{ color: 'red', width: '20px', height: '20px', marginRight: '5px' }} /> {item.noOfLikes}
                                <CommentIcon sx={{ width: '20px', height: '20px', marginLeft: '10px', marginRight: '5px' }} /> {item.noOfComments}
                            </Box>
                        </Box>
                    </div>
                ))}

            </Box>

        </>
    )
}

export default Home; 