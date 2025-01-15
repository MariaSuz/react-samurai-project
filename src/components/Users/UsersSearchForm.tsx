import React from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import styles from './users.module.css';
import { FilterType } from '../../redux/users-reducer';

type UserSearchFormType = {
    onFilterChanged:(filter: FilterType) => void,
}

type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'
}

export const UserSearchForm: React.FC<UserSearchFormType> = (props) => {

    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        debugger
        props.onFilterChanged(filter);
        setSubmitting(false);
    };

    const usersSearchFormValidate = (values: any) => {
        const errors = {}
        return errors
    };

    return ( <div>
        <Formik
            initialValues = {{ term: '', friend: 'null' }}
            validate = {usersSearchFormValidate}
            onSubmit = {submit}
            >
            {({ isSubmitting }) => (
                <Form>
                <div className={styles.search_form_div}>
                    <Field type="text" name="term" placeholder="User name for searching"/>
                    Followed users
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                </div>
                <button type="submit" disabled={isSubmitting}>
                    Find Users
                </button>
                </Form>
            )}
    </Formik>
    </div>)
}
