import React, { useEffect, useContext } from 'react'; 
import LoginContext from '../context/LoginContext'; 

const backend = 'http://localhost:3000';

const Home = () => {
    const { userName, setUserProfileImage } = useContext(LoginContext); 

    useEffect(()=>{
        fetchUserInfo();
    }, []); 

    const fetchUserInfo = async () => {
        try {
            await fetch(`${backend}/${userName}/set-image`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json' 
                }, 
                body: JSON.stringify({username: userName})
            }).then(response => response.json())
            .then(data => {
                console.log(data);
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