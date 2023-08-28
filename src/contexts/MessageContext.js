import React , {createContext , useContext} from "react";


const MessageContext = createContext(null)


export const useMessage = ()=>{
     const messageC = useContext(MessageContext)
     return messageC
}


export const MessageProvider = (props) =>{
    let message = {}
    return(
        <MessageContext.Provider value = {message}>
            {props.children}
        </MessageContext.Provider>
    )
}