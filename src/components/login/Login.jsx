import React from 'react';
import { Field, reduxForm } from 'redux-form';

const LoginForm = (props) => {

    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                {/*  Из-за redux-form меняю input  на Field*/}
                <Field placeholder={'Login'} name={'login'} component={'input'}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} component={'input'}/>
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={'input'}/> remember me
            </div>
            <dir>
                <button>Login</button>
            </dir>
        </form>
    )}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>

}

export default Login;