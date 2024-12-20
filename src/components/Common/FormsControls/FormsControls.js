import { Field } from 'redux-form';
import styles from './FormsControls.module.css'

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

export const createField = (placeholder, name, validators, component) => {
    <Field placeholder={placeholder} name={name} component={component} validate={validators}/>
}