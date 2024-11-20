import Login from './Login';
import React from 'react';
import { connect } from "react-redux";
import { getLogin} from "../../redux/auth-reducer";
import { compose } from 'redux';


let mapStateToProps = (state) => ({
    email: state.auth.email,
    password: state.auth.password,
    rememberMe: state.auth.rememberMe,
    isAuth: state.auth.isAuth,
    captcha: state.auth.captcha,
})


class LoginContainer extends React.Component {

    componentDidMount() {
        this.props.getLogin(this.props.email, this.props.password, this.props.rememberMe);
    }

    render () {
        return (
            <Login {...this.props} getLogin={this.props.getLogin}/>
        )
    }
}


export default compose(
    connect(mapStateToProps, {getLogin})
  )(LoginContainer);