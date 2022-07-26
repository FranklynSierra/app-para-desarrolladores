import { createContext,useState } from "react";

const AuthContext=createContext({})

export const AuntProvider=({children})=>{
    const [auth,setAuth]=useState({})
    return(
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext