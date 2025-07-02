import { createContext, useContext, useState } from "react";

export const CountContext = createContext();


export const ContextProvider = (props) => {
    const [getView,setView]=useState({});
    return <CountContext.Provider value={{getView,setView}} >
        {props.children}
    </CountContext.Provider>
}