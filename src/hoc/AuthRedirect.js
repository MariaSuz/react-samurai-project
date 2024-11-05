import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

let mapStateToPropsForRedirect = (state) => {
    return {
      isAuth: state.auth.isAuth
    }
  }

export const withAuthRedidirect = (Component) => {
    let redirectComponent = (props) => {
        if(!props.isAuth) return <Navigate to='/Login' replace={true}/>;
        return <Component {...props}/>
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(redirectComponent);

  return ConnectedAuthRedirectComponent;
}
