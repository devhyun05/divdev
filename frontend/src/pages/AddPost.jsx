import "../App.css";
import { useState } from 'react'; 
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField'; 
import Box from '@mui/material/Box'; 
import Button from '@mui/material/Button'

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

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
    const [value, setValue] = useState('');
    const [image, setImage] = useState(''); 
    const [imageName, setImageName] = useState('');

    const toolbarOptions = [
                           ['bold', 'italic', 'underline', 'strike'], 
                           ['blockquote', 'code-block'],
                           [{ 'header': 1 }, { 'header': 2 }],
                           [{ 'list': 'ordered'}, { 'list': 'bullet'}],
                           [{ 'script': 'sub'}, { 'script': 'super'}],
                           [{ 'indent': '-1'}, { 'indent': '+1'}],
                           [ {'direction': 'rtl'}], 

                           [{ 'size': ['small', false, 'large', 'huge']}], 
                           [ {'header': [1, 2, 3, 4, 5, 6, false]}], 

                           [{ 'color': []}, { 'background': []}],
                           [{ 'font': []}],
                           [{ 'align': []}],

                           ['clean']
                        ]; 
    const module = {
        toolbar: toolbarOptions,
    }; 

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
        setImageName(event.target.files[0].name); 
    }; 

    return (
        <>
   
            <Box sx={{display: 'flex', flexDirection: 'column',  width: '60%', height: '60%', margin: '0 auto', color: 'white'}}>
                    
                    <input type="file" id="file" onChange={handleImageChange}/> 
                    <label for="file" class="file-label">
                    {imageName ? (
                        imageName
                        ) : (
                        <>
                            <AddPhotoAlternateIcon />
                            Choose Thumbnail
                        </>
                        )}           
                    </label>
              

                {/* <FormControl fullWidth>
                  
                    <Select                        
                    >
                        <MenuItem value={"React"}>React</MenuItem>
                        <MenuItem value={"Angular"}>Angular</MenuItem>
                    </Select>
                </FormControl> */}
                <CssTextField
                    sx={{marginBottom: '5%'}}
                    placeholder="Title"
                    InputProps={{
                        style: {
                            color: 'white'
                        },                            
                    }}
                />

                <ReactQuill
                    modules={module}
                    theme="snow"
                    value={value}
                    onChange={(e) => setValue(e)}
                    style={{ width: '100%', height: '100%', margin: '0 auto'}}
                />
            </Box>
            <AppBar component="nav" sx={{position: 'fixed', bottom: '0', top: '91%', background:'#1e1e1e'}}>
                <Toolbar sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button sx={{color: 'black', backgroundColor: '#F5F5DC', borderRadius: '10px', width: '100px', marginTop: '1%', marginRight: '1%'}}>
                        Preview
                    </Button>
                    <Button sx={{color: 'black', backgroundColor: '#F5F5DC', borderRadius: '10px', width: '100px', marginTop: '1%'}}>
                        Post
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default AddPost; 