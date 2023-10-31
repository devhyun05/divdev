import { createContext, useState } from 'react';

const LoginContext = createContext();

export function LoginProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginText, setLoginText] = useState("sss");
    const [userName, setUserName] = useState(""); 
    const [userEmail, setUserEmail] = useState(""); 
    const [userRole, setUserRole] = useState(""); 
    const [profileLayout, setProfileLayout] = useState(""); 
    const [navbarLayout, setnavbarLayout] = useState(""); 
    const [bgColor, setBgColor] = useState(""); 
    const [userProfileImage, setUserProfileImage] = useState(""); 

    return (
        <LoginContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            loginText,
            setLoginText,
            userName,
            setUserName,
            userEmail,
            setUserEmail,
            userRole,
            setUserRole, 
            userProfileImage, 
            setUserProfileImage,
            profileLayout, 
            setProfileLayout,
            navbarLayout, 
            setnavbarLayout,
            bgColor,
            setBgColor 
        }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContext;