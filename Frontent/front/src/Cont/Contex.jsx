import { createContext, useState } from "react";

export const Contex = createContext();


export const ContextProvider = (props) => {
    const [get_IfUserLogin, set_IfUserLogin] = useState(false);
    const [getUserAccount,setUserAccount]=useState("");

    return <Contex.Provider value={{getUserAccount,setUserAccount ,get_IfUserLogin ,set_IfUserLogin}} >
        {props.children}
    </Contex.Provider>
}