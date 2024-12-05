import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../Common/FormsControls/FormsControls';
import { requuiredField } from '../../utils/validators/validators';
import { Navigate} from 'react-router-dom';
import style from '../Common/FormsControls/FormsControls.module.css'
// import CaptchaForm from '../Common/Captcha/Captcha';


const LoginForm = (props) => {

    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                {/*  Из-за redux-form меняю input  на Field*/}
                <Field placeholder={'Login'} name={'login'} component={Input} validate={[requuiredField]}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} component={Input} validate={[requuiredField]}/>
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Input}/> remember me
            </div>
            {props.error ?
            <div className={style.some_error}>
                {props.error}
            </div>
            : '' }
             {props.captchaUrl && <img src={props.captchaUrl}  alt='captcha'/>}
             {props.captchaUrl && <Field name={'captcha'} component={Input}/>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.getLogin(formData.login, formData.password, formData.rememberMe, formData.captcha);
    }

    if(props.isAuth){
         return  <Navigate replace to='/profile' />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}  captchaUrl={props.captchaUrl}/>
    </div>

}

export default Login;