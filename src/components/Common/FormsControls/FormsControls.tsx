import { Field } from 'redux-form';
import styles from './FormsControls.module.css'
import { FieldValidatorType } from '../../../utils/validators/validators';
import React from 'react';

export const Textarea = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error ;
    return (
        <div className={hasError? styles.errorborder: ''}>
            <textarea {...input} {...props} />
            { hasError && <span> {meta.error} </span> }
        </div>
    )
}


export const Input = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error ;
    return (
        <div className={hasError? styles.errorborder: ''}>
            <input {...input} {...props} />
            { hasError && <span> {meta.error} </span> }
        </div>
    )
}

export const createField = (placeholder: string, name: string, validators: Array<FieldValidatorType>, component: React.FC) => {
    <Field placeholder={placeholder} name={name} component={component} validate={validators}/>
}