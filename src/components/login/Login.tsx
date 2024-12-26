import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Input } from '../Common/FormsControls/FormsControls.tsx';
import { requuiredField } from '../../utils/validators/validators.ts';
import { Navigate} from 'react-router-dom';
import style from '../Common/FormsControls/FormsControls.module.css'
// import CaptchaForm from '../Common/Captcha/Captcha';

type LoginFormOwnProps = {
    captchaUrl: string | null,
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return(
        <form onSubmit={handleSubmit}>
            <div>
                {/*  Из-за redux-form меняю input  на Field*/}
                <Field placeholder={'Login'} name={'email'} component={Input} validate={[requuiredField]}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} component={Input} validate={[requuiredField]}/>
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Input}/> remember me
            </div>
            {error ?
            <div className={style.some_error}>
                {error}
            </div>
            : '' }
             {captchaUrl && <img src={captchaUrl}  alt='captcha'/>}
             {captchaUrl && <Field name={'captcha'} component={Input}/>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)


type MapPropsType = {
    isAuth: boolean,
    captchaUrl: string | null,
}
type MapDispatchPropsType = {
    getLogin: (email: string, password: string, rememberMe: boolean) => void,
}

type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}


const Login: React.FC<MapPropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType ) => {
        props.getLogin(formData.email, formData.password, formData.rememberMe, formData.captcha);
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