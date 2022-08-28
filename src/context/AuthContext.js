import { createContext, useState } from "react";

const API_URL = 'https://developer-news-back.herokuapp.com/auth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('persist')) || false);
    const [ auth, setAuth ] = useState({});
    const [ persist, setPersist ] = useState(JSON.parse(localStorage.getItem('persist')) || false);

    const loginUser = async ({username, password}) => {
        try {
            const responseUser = await fetch(`${API_URL}/login`, {
                method: 'POST',
                // Se debe desplegar primero la aplicacion para poder dar credentials                
                // credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
            });

            if(responseUser.status != 401){
                const userLoged = await responseUser.json();
                console.log(userLoged)
                setUser(userLoged)
                localStorage.setItem('persist', JSON.stringify(userLoged))
                return userLoged
            } else {
                return responseUser.status;
            }            
        } catch (error) {
            console.log(error)
        }
    };

    const logoutUser = async () => {
        try {
            const response = await fetch(`${API_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.status === 200){
                const res = await response.json();
                return res;
            } else {
                console.log(response)
                localStorage.removeItem('persist');
                setUser(false)
                return response.statusText
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <AuthContext.Provider value={{ auth, setAuth,persist,setPersist, loginUser, user, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;