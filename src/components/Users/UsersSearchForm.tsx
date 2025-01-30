import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { FilterType } from '../../redux/users-reducer';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { getUsersFilter } from '../../redux/users-selectors.ts';

export const UserSearchForm: React.FC<UserSearchFormType> = (props) => {
    const filter = useSelector(getUsersFilter)
    const submit = (values: FormType, {setSubmitting}: FormikHelpers<FormType>) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'true' ? true : values.friend === 'false' ? false : null
            // friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        debugger
        console.log("Filter:", filter); // Проверка данных
        props.onFilterChanged(filter);
        setSubmitting(false);
    };

    return ( <div>
        <Formik
            initialValues = {{ term: filter.term, friend: String(filter.friend)}}
            onSubmit = {submit}
            >
            {({ isSubmitting, errors, touched, handleChange, handleBlur, values }) => (
                <Form>
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                        <TextField
                            label="User name for searching"
                            variant="outlined"
                            name="term"
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleBlur}
                            sx={{mb: 2}}
                            value={values.term}
                            />
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Followers"
                            name="friend"
                            value={values.friend}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText="Please select user status"
                            >
                            <MenuItem value="null">All</MenuItem>
                            <MenuItem value="true">Only followed</MenuItem>
                            <MenuItem value="false">Only unfollowed</MenuItem>
                        </TextField>
                        <Button type="submit" disabled={isSubmitting} variant="contained">
                            Find Users
                        </Button>
                    </Box>
                </Form>
            )}
    </Formik>
    </div>)
}


type UserSearchFormType = {
    onFilterChanged:(filter: FilterType) => void,
}

type FormType = {
    term: string
    friend: string
}

type FriendFormType = 'true' | 'false' | 'null'