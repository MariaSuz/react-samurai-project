import Login from './Login';
import React from 'react';
import { connect } from "react-redux";
import { getLogin, getCaptchaURL} from "../../redux/auth-reducer";
import { compose } from 'redux';


let mapStateToProps = (state) => ({
    email: state.auth.email,
    password: state.auth.password,
    rememberMe: state.auth.rememberMe,
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth. captchaUrl,
})


class LoginContainer extends React.Component {

    componentDidMount() {
        this.props.getLogin(this.props.email, this.props.password, this.props.rememberMe);
    }

    render () {
        return (
            <Login {...this.props} getLogin={this.props.getLogin} getCaptchaURL={this.props.getCaptchaURL}/>
        )
    }
}


export default compose(
    connect(mapStateToProps, {getLogin, getCaptchaURL})
  )(LoginContainer);