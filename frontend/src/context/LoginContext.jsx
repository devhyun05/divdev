import { createContext, useState } from 'react';

const LoginContext = createContext();

export function LoginProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginText, setLoginText] = useState("sss");
    const [userName, setUserName] = useState(""); 
    const [profileLayout, setProfileLayout] = useState(); 
    const [navbarLayout, setnavbarLayout] = useState(); 

    return (
        <LoginContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            loginText,
            setLoginText,
            userName,
            setUserName,
            profileLayout, 
            setProfileLayout,
            navbarLayout, 
            setnavbarLayout 
        }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContext;