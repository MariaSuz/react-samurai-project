import React from "react";
const StoreContext = React.createContext(null);

//Это при подключении redux без react-redux . Для ознакомления

export const Provider = (props) => {
    return  <StoreContext.Provider value={props.store}>
        {props.children}
    </StoreContext.Provider>
}

export default StoreContext;