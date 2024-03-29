import "../App.css";
import React, { useState, useEffect, useContext } from 'react';
import LoginContext from '../context/LoginContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Input from '@mui/material/Input';
import defaultImage from '../assets/img/default-image.jpg'; 
import BackspaceIcon from '@mui/icons-material/Backspace';

const backend = process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://www.divdev.pro"; 


const Home = () => {
    const { username } = useParams();
    const { userName, setUserName, setIsLoggedIn, userRole, setUserRole, userProfileImage, setUserProfileImage } = useContext(LoginContext);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [blogPostInfo, setBlogPostInfo] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [countForRender, setCountForRender] = useState(0); 

 
    
    const navigate = useNavigate();


    useEffect(() => {      
        const fetchData = async () => {
            visitorUserCheck();
            await fetchUserInfo();
            await fetchBlogPost();
            setIsLoading(false);
        };
    
        fetchData();
    }, [isLoading]);    // eslint-disable-line react-hooks/exhaustive-deps
    


  
    const visitorUserCheck = () => {
        if (userRole !== "LoggedInUser") {
            setUserRole("Visitor");
            setUserName(username);
            setIsLoggedIn(true);
        }
    };

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
                    setUserProfileImage(data.userInfo.userImage);
                    setCategoryList(data.categoryList);
                });
        } catch (error) {
            console.error('Error: ', error);
        }

    }

    const fetchBlogPost = async () => {
        try {
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

    const handleNavigatePostDetails = (id) => {
        navigate(`/${userName}/${id}`);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleNewCategoryChange = (event) => {
        setNewCategory(event.target.value);
    };

    const handleAddCategory = async () => {
        try {
            const response = await fetch(`${backend}/${userName}/add-category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: userName, category: newCategory })
            });
            const categories = await response.json();
            setCategoryList(categories);
            setCountForRender(countForRender + 1);
        } catch (error) {
            console.error(error);
        }

        handleCloseDialog();
    }

    const handleClickCategory = async (category) => {
        try {
            setSelectedCategory(category);
            if (category === "All") {
                fetchBlogPost();
            } else {
                const response = await fetch(`${backend}/${userName}/sort-post`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ category: category })
                });

                const postArray = await response.json();

                setBlogPostInfo(postArray);
                console.log(blogPostInfo);
            }


        } catch (error) {
            console.error(error);
        }

    };

    const handleRemoveCategory = async (category) => {
        try {
            const updatedCategoryList = categoryList.filter((c) => c !== category); 

            await fetch(`${backend}/${userName}/remove-category`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName: username, categoryList: updatedCategoryList})
            });

            setCountForRender(countForRender + 1); 
        } catch (error) {
            console.error("Error: ", error); 
        }
    }; 


    return (
        <>
    
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', position: 'absolute', height: '92%', width: '10vw' }}>
                <Box sx={{ display: 'flex', marginTop: '65%', marginBottom: '15%', fontWeight: 'bold' }}>
                    Category
                    {userRole === "LoggedInUser" ? 
                    <>
                    <IconButton style={{ color: 'white', padding: '0' }} onClick={handleOpenDialog}>
                        <AddIcon />
                    </IconButton>
                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle>Add New Category</DialogTitle>
                        <DialogContent>
                            <Input
                                placeholder="Enter new category"
                                value={newCategory}
                                onChange={handleNewCategoryChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleAddCategory} color="primary">
                                Add
                            </Button>
                        </DialogActions>
                    </Dialog>
                    </>
                    : ""}
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                        sx={{
                            display: 'flex',
                            textTransform: 'none',
                            paddingLeft: '10px',
                            backgroundColor:
                                "All" === selectedCategory
                                    ? '#4681f4'
                                    : 'inherit',
                          
                        }}
                        onClick={() => handleClickCategory("All")} // Add this line
                    >
                        <Typography className="responsive-color" sx={{ marginRight: 'auto' }}>
                            All
                        </Typography>
                    </Button>
                    {categoryList && categoryList.map((category, index) => (
                        <Button key={index}
                            sx={{
                                display: 'flex',
                                textTransform: 'none',
                                backgroundColor: category === selectedCategory ? '#4681f4' : 'inherit',
                                paddingLeft: '10px'
                            }}
                            onClick={() => handleClickCategory(category)}>
                            <Typography className="responsive-color"  sx={{ marginRight: 'auto' }}>
                                {category} 
                            </Typography>
                            {userRole === "LoggedInUser" &&
                            <BackspaceIcon style={{color: 'white', marginLeft: '30px'}}
                                           onClick={() => handleRemoveCategory(category)}/>
                            }
                        </Button>
                        
                    ))}
                </Box>


            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1%', marginRight: '5%' }}>
                <Link to={`/${userName}/addpost`}>
                    {userRole === "LoggedInUser" ? 
                    <Button sx={{ backgroundColor: '#4681f4', color: 'white', fontWeight: 'bold' }}>
                        Upload Post
                    </Button>
                    : ""}
                </Link>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '50px', width: '75%', margin: '0 auto', color: 'white', marginLeft: '20%' }}>
                {blogPostInfo && blogPostInfo.map((item, index) => (
                    <div onClick={() => handleNavigatePostDetails(item._id)} className="post-container" key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ backgroundColor: '#1f1f23', borderRadius: '10px'}}>
                            {item.thumbnailImage ?                                        
                                <img src={item.thumbnailImage} alt="" style={{ width: '300px', height: '150px', borderRadius: '10px' }} />                     
                            :                          
                                <img src={defaultImage} alt="" style={{ width: '300px', height: '150px', borderRadius: '10px' }} />                  
                            }
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

            <Box>
                        
            </Box>
            

        </>
    )
}

export default Home; 