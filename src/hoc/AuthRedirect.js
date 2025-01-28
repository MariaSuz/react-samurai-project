import { Navigate } from "react-router-dom";
import { connect, useSelector } from 'react-redux';
import React from "react";
import { getisAuth } from "../redux/users-selectors";

const isAuth = useSelector(getisAuth);

let  withAuthRedidirect = (Component) => {
    let redirectComponent = (props) => {
      if(!isAuth) return <Navigate to='/Login' replace={true}/>;
      return <Component {...props}/>
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(redirectComponent);

  return ConnectedAuthRedirectComponent;
}

export default withAuthRedidirect;