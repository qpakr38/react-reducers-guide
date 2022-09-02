import React, {useEffect,useState} from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogin: () => {},
    onLogout: (email, password) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
        if (storedUserLoggedInInformation === "1") {
            setIsLoggedIn(true);
        }
    }, [])
    const loginHandler = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', '1');
    };
    const logoutHandler = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    };
    return (
        <AuthContext.Provider value={
            {
                isLoggedIn: isLoggedIn,
                onLogin: loginHandler,
                onLogout: logoutHandler
            }
        }>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContext
