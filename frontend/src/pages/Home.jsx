import React, { useState, useEffect, useContext } from 'react'; 
import LoginContext from '../context/LoginContext';
import { Link } from 'react-router-dom'; 
import Container from '@mui/material/Container'; 
import Box from '@mui/material/Box'; 
import Button from '@mui/material/Button'; 
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'; 
import AddIcon from '@mui/icons-material/Add';


const backend = 'http://localhost:3000';

const Home = () => {

    const { userName,  setUserProfileImage } = useContext(LoginContext); 


    useEffect(()=>{
        fetchUserInfo();
    }, []); 

    const fetchUserInfo = async () => {
      
        // const username = window.localStorage.getItem('username'); 
        // setUserName(username); 
        try {
            await fetch(`${backend}/${userName}/set-image`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json' 
                }, 
                body: JSON.stringify({username: userName})
            }).then(response => response.json())
            .then(data => {
                
                setUserProfileImage(data.userImage); 
            });
        } catch (error) {
            console.error('Error: ', error); 
        }
    }

    const handleAddCategory = () => {
        
    };

    return (
        <>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: '100px'}}>
                <Box sx={{marginTop: '5%'}}>
                    <Button sx={{color: 'white'}}
                            onClick={handleAddCategory}>
                        Add Category <AddIcon/>
                        
                    </Button>
                    <Button>
                        <TextField
                        InputProps={{
                            style: {
                                color: 'white'
                            }
                        }}
                        />
                    </Button>
                </Box>
                <Link to={`/${userName}/addpost`}>
                    <Button sx={{backgroundColor: '#4681f4', color: 'white'}}>
                        Upload Post
                    </Button>
                    
                </Link>
            </Box>
        </>
    )
}

export default Home; 