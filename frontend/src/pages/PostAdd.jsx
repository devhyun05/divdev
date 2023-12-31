import "../App.css";
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import LoginContext from '../context/LoginContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

const backend = "http://localhost:8000";

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


const AddPost = () => {
    const { userName, userProfileImage } = useContext(LoginContext);
    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState('');
    const [base64ImageString, setBase64ImageString] = useState('');
    const [category, setCategory] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [postContent, setPostContent] = useState([]);
    const [postTime, setPostTime] = useState('');
    const [title, setTitle] = useState('');
    const [switchPreview, setSwitchPreview] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategoryList();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchCategoryList = async () => {
        try {
            const response = await fetch(`${backend}/${userName}/post/get-category-lists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: userName })
            });

            const categories = await response.json();
            console.log(categories);
            setCategoryList(categories);
        } catch (error) {
            console.error(error);
        }
    };

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['link', 'image'], // Added link and image options
        ['clean']
    ];

    const module = {
        toolbar: toolbarOptions,

    };

    const handleSubmit = async () => {
        const currentDate = new Date().toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" });

        try {
    
            const formData = new FormData();
            formData.append('username', userName);
            formData.append('image', image);
            formData.append('category', category);
            formData.append('postContent', postContent);
            formData.append('title', title);
            formData.append('postTime', currentDate);
            formData.append('noOfLikes', 0);
            formData.append('noOfComments', 0);


            await fetch(`${backend}/${userName}/post/add-post-info`, {
                method: 'POST',
                body: formData
            })

            navigate(`/${userName}`);
        } catch (error) {
            console.error(error);
        }
    }

    const handleCategory = (event) => {
        setCategory(event.target.value);
    }

    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        
        const reader = new FileReader();

        reader.readAsDataURL(file)
        reader.onload = () => {
            setBase64ImageString(reader.result)
        }

        setImage(file);
        setImageName(file.name);
    };

    const handleNavigatePreview = () => {
        const currentDate = new Date().toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" });
        setPostTime(currentDate);
        setSwitchPreview(true);
    }

    const handleNavigateAddPost = () => {
        setSwitchPreview(false);
    }


    return (
        <>
            {!switchPreview ?
                <>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '60%', height: '70%', margin: '0 auto', color: 'white' }}>

                        <input type="file" id="file" onChange={handleImageChange} />
                        <label for="file" class="post-file-label">
                            {imageName ? (
                                imageName
                            ) : (
                                <>
                                    <AddPhotoAlternateIcon />
                                    Choose Thumbnail
                                </>
                            )}
                        </label>


                        <FormControl style={{ width: '30%', border: '1px solid #E0E3E7', borderRadius: '4px', }}>
                            <InputLabel style={{ color: 'white' }}>Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                placeholder="Category"
                                defaultValue="No Category"
                                onChange={handleCategory}
                                style={{ color: '#E0E3E7' }}
                            >
                                <MenuItem value={"No Category"}>No Category</MenuItem>
                                {categoryList && categoryList.map((category, index) => (
                                    <MenuItem key={index} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <CssTextField
                            sx={{ marginTop: '5%', marginBottom: '5%' }}
                            placeholder="Title"
                            onChange={handleTitle}
                            defaultValue={title}
                            InputProps={{
                                style: {
                                    color: 'white'
                                },
                            }}
                        />

                        <ReactQuill
                            modules={module}
                            theme="snow"
                            value={postContent}
                            onChange={(e) => { setPostContent(e) }}
                            style={{ width: '100%', height: '100%', margin: '0 auto' }}
                        />
                    </Box>
                    <AppBar component="nav" sx={{ position: 'fixed', bottom: '0', top: '91%', background: '#1e1e1e' }}>
                        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button sx={{ color: 'black', backgroundColor: '#F5F5DC', borderRadius: '10px', width: '100px', marginTop: '1%', marginRight: '1%' }}
                                onClick={handleNavigatePreview}>
                                Preview
                            </Button>
                            <Button sx={{ color: 'black', backgroundColor: '#F5F5DC', borderRadius: '10px', width: '100px', marginTop: '1%' }}
                                onClick={handleSubmit}>
                                Post
                            </Button>
                        </Toolbar>
                    </AppBar>
                </>
                :
                <>
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', color: 'white' }}>
                        <Box sx={{ width: '50%', height: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '90px' }}>
                            <Typography variant="h4">
                                Preview
                            </Typography>
                            <Box sx={{ backgroundColor: '#1f1f23', borderRadius: '10px' }}>
                                <img src={base64ImageString} alt="" style={{ width: '300px', height: '170px', borderRadius: '10px', objectFit: 'cover' }} />
                                <Typography variant="h5" sx={{ textAlign: 'center', maxWidth: '300px' }}>
                                    {title} <br />
                                </Typography>
                                <Typography sx={{ textAlign: 'center', color: '#C0C0C0', maxWidth: '300px' }} dangerouslySetInnerHTML={{ __html: postContent }} />
                                <br /><hr />
                                <Box sx={{ display: 'flex', flexDirection: 'row', height: '30px', marginLeft: '10px', marginTop: '10px' }}>
                                    <Avatar alt={`${userName}`} src={userProfileImage} style={{ width: '25px', height: '25px', marginRight: '10px' }} />
                                    <Typography sx={{ marginRight: '90px' }}>{userName}</Typography>
                                    <FavoriteIcon sx={{ color: 'red', width: '20px', height: '20px', marginRight: '5px' }} /> {'0'}
                                    <CommentIcon sx={{ width: '20px', height: '20px', marginLeft: '10px', marginRight: '5px' }} /> {'0'}
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ position: 'absolute', borderLeft: '6px solid white', height: '90%', top: '5%', left: '50%' }} />

                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '6%', marginLeft: '15%', width: '30%' }}>
                            <Typography variant="h4">
                                Details View
                            </Typography>
                            <Box sx={{ width: '100%', textAlign: 'left', marginTop: '10%' }}>
                                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                                    {title}
                                </Typography>
                            </Box>
                            <Box sx={{ width: '50%', textAlign: 'left', marginTop: '1%', color: '#C0C0C0' }}>
                                <Typography>
                                    {userName}, {postTime}
                                </Typography>
                            </Box>
                            <Box sx={{ width: '80%', textAlign: 'left', marginTop: '2%' }}>
                                <Typography dangerouslySetInnerHTML={{ __html: postContent }} />
                            </Box>
                        </Box>
                    </Box>
                    <AppBar component="nav" sx={{ position: 'fixed', bottom: '0', top: '91%', background: '#1e1e1e' }}>
                        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button sx={{ color: 'black', backgroundColor: '#F5F5DC', borderRadius: '10px', width: '100px', marginTop: '1%', marginRight: '1%' }}
                                onClick={handleNavigateAddPost}>
                                Go Back
                            </Button>
                            <Button sx={{ color: 'black', backgroundColor: '#F5F5DC', borderRadius: '10px', width: '100px', marginTop: '1%' }}
                                onClick={handleSubmit}>
                                Post
                            </Button>
                        </Toolbar>
                    </AppBar>
                </>
            }
        </>
    )
}

export default AddPost; 