import { createContext, useState } from 'react';

const LoginContext = createContext();

export function LoginProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginText, setLoginText] = useState("sss");
    return (
        <LoginContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            loginText,
            setLoginText
        }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContext;