import React, { useEffect, useContext } from 'react'; 
import LoginContext from '../context/LoginContext'; 

const backend = 'http://localhost:3000';

const Home = () => {
    const { userName, setUserName, setUserProfileImage } = useContext(LoginContext); 

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
    return (
        <>
   
        </>
    )
}

export default Home; 