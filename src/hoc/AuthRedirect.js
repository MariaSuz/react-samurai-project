import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import React from "react";

let mapStateToPropsForRedirect = (state) => {
    return {
      isAuth: state.auth.isAuth
    }
  }

let  withAuthRedidirect = (Component) => {
    let redirectComponent = (props) => {
      if(!props.isAuth) return <Navigate to='/Login' replace={true}/>;
      return <Component {...props}/>
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(redirectComponent);

  return ConnectedAuthRedirectComponent;
}

export default withAuthRedidirect;