import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { AppStateType } from '../redux/redux-store';
import React from "react";

let mapStateToPropsForRedirect = (state: AppStateType) => {
    return {
      isAuth: state.auth.isAuth
    }
  }

export const withAuthRedidirect = (Component) => {
    let redirectComponent = (props) => {
      let {isAuth, ...restProps} = props
      if(isAuth) return <Navigate to='/Login' replace={true}/>;
      return <Component {...restProps}/>
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(redirectComponent);

  return ConnectedAuthRedirectComponent;
}
