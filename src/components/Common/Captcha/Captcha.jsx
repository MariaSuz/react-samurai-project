import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../FormsControls/FormsControls';
import { requuiredField } from '../../../utils/validators/validators';
// import style from '../Common/FormsControls/Captcha.module.css'


const CaptchaForm = (props) => {

    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                {props.captcha}
                <Field placeholder={'Captcha'} name={'captcha'} component={Input} validate={[requuiredField]}/>
            </div>
        </form>
    )}

const CaptchaReduxForm = reduxForm({form: 'captcha'})(CaptchaForm)

const Captcha = (props) => {
    const onSubmit = (formData) => {
        props.getLogin(formData.captcha);
    }

    return <div>
        <span>Wtite captcha text: {props.captcha}</span>
        <img src={props.captcha} alt="captcha text" />
        <CaptchaReduxForm onSubmit={onSubmit}/>
    </div>

}

export default Captcha;