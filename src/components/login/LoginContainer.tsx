import Login from './Login.tsx';
import React from 'react';
import { connect } from "react-redux";
import { getLogin, getCaptchaURL} from "../../redux/auth-reducer.ts";
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store.ts';


let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth. captchaUrl,
})


type PropsType = {
    getLogin: (email: string, password: string, rememberMe: boolean) => void,
    getCaptchaURL: () => void,
}

class LoginContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getLogin(this.props.email, this.props.password, this.props.rememberMe);
    }

    render () {
        return (
            <Login {...this.props} getLogin={this.props.getLogin} getCaptchaURL={this.props.getCaptchaURL} />
        )
    }
}


export default compose(
    connect(mapStateToProps, {getLogin, getCaptchaURL})
  )(LoginContainer);