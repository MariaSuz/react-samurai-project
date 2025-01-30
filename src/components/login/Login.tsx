import React from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import { getcaptchaUrl, getisAuth } from '../../redux/users-selectors.ts';
import { AppDispatch } from '../../redux/redux-store.ts';
import { getLogin} from '../../redux/auth-reducer.ts';



const LoginForm: React.FC<LoginFormOwnProps> = (props) => {
    const submit = (values: LoginFormValuesType, {setSubmitting}: FormikHelpers<LoginFormValuesType>) => {
        props.onSubmit(values);
        setSubmitting(false)
    };

    const usersSearchFormValidate = (values: LoginFormValuesType) => {
        const errors: Partial<LoginFormValuesType> = {};
        if (!values.email) {
            errors.email = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required';
        }
        if (props.captchaUrl && !values.captcha) {
            errors.captcha = 'Required';
        }
        return errors;
    };


    return(
        <Formik
            initialValues = {{ email: '', password: '', rememberMe: false,  captcha: ''}}
            validate = {usersSearchFormValidate}
            onSubmit = {submit}
            >
            {({ isSubmitting, errors, touched, handleChange, handleBlur }) => (
                <Form>
                    <TextField
                            label="Email"
                            variant="outlined"
                            name="email"
                            fullWidth
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{mb: 2}}
                        />
                    <TextField
                        label="Password"
                        variant="outlined"
                        name="password"
                        type="password"
                        fullWidth
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                        sx={{mb: 2}}
                    />
                    <FormControlLabel
                        control={<Checkbox  />}
                        label="Remember Me"
                        name="rememberMe"
                        onChange={handleChange}
                    />
                    {props.captchaUrl && <img src={props.captchaUrl} alt="captcha" />}
                    {props.captchaUrl && <TextField
                        variant="outlined"
                        name="captcha"
                        type="input"
                        fullWidth
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.captcha && errors.captcha)}
                        helperText={touched.captcha && errors.captcha}
                        sx={{mb: 2}}
                    /> }
                        {/* <Field type="text" name="email" placeholder="Login"/>
                        {errors.email && <div>{errors.email}</div>}
                        <Field type="password" name="password" placeholder="Password"/>
                        {errors.password && <div>{errors.password}</div>}
                        <Field type="checkbox" name="rememberMe" />  Remember me
                        {props.captchaUrl && <img src={props.captchaUrl} alt="captcha" />}
                        {props.captchaUrl && <Field type="text" name="captcha" placeholder="Enter captcha" />} */}
                    <Button type="submit" disabled={isSubmitting} variant="contained" fullWidth>Login</Button>
                </Form>
            )}
    </Formik>
    )}

export const Login: React.FC = (props) => {
    const isAuth = useSelector(getisAuth)
    const captchaUrl = useSelector(getcaptchaUrl)

    const dispatch:AppDispatch = useDispatch()
    const onSubmit = (formData: LoginFormValuesType ) => {
        dispatch(getLogin(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if(isAuth){
        return  <Navigate replace to='/profile' />
    }

    return  (
    <Stack direction="row" justifyContent="center" alignItems="center" height="100vh">
        <Box  sx={{ display: 'flex', flexDirection: 'column',  alignItems: 'center', maxWidth: 400 }}>
            <Typography variant="h2" gutterBottom sx={{ color: '#49c0f0'}}>
                Login
            </Typography>
            <LoginForm  onSubmit = {onSubmit} captchaUrl={captchaUrl}/>
            <Box sx={{  bgcolor: 'background.paper', boxShadow: 1, borderRadius: 2, p: 2, minWidth: 280, display: 'flex', flexDirection: 'column',  alignItems: 'center', gap: 1,  m: 4}}>
                <span>Test User:</span>
                <span>index93@mail.ru</span>
                <span>TestP@ss1!</span>
            </Box>
        </Box>
    </Stack>
    )

}

type LoginFormOwnProps = {
    captchaUrl: string | null,
    onSubmit: (values: LoginFormValuesType) => void;
}
type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

