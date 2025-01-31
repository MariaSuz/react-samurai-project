import React, { useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { ContactsType, ProfileType } from '../../../types/types.ts';
import { Box, Button, Checkbox, Collapse, FormControlLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Modal, Switch, TextField, Typography } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ContactsIcon from '@mui/icons-material/Contacts';


export const ProfileEditForm: React.FC<PropsType> = (props) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const submit = (values: ValueType, {setSubmitting}: FormikHelpers<ValueType>) => {
            props.onSubmit(values);
            setSubmitting(false)
        };

    if (!props.profile) {
        return null; // или можно вернуть заглушку, если профиль не загружен
    }

    return (
        <Formik
        initialValues = {{ lookingForAJob: props.profile.lookingForAJob || false, lookingForAJobDescription: props.profile.lookingForAJobDescription || '', contacts: props.profile.contacts || {} as ContactsType, fullName: props.profile.fullName || '', aboutMe: props.profile.aboutMe || ''}}
        onSubmit = {submit}
        >
        {({ isSubmitting, values, handleChange, handleBlur }) => (
            <Form>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <TextField
                            label="Name"
                            variant="outlined"
                            name="fullName"
                            fullWidth
                            value={values.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            sx={{mb: 2}}
                    />
                    <TextField
                            label="About me"
                            variant="outlined"
                            name="aboutMe"
                            fullWidth
                            value={values.aboutMe}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            sx={{mb: 2}}
                    />
                    <FormControlLabel
                    control={<Checkbox  checked={values.lookingForAJob} />}
                    label="Looking for a job:"
                    name="lookingForAJob"
                    onChange={handleChange}
                    />
                    {values.lookingForAJob && (
                    <TextField
                        label="Write your skills"
                        variant="outlined"
                        name="lookingForAJobDescription"
                        fullWidth
                        value={values.lookingForAJobDescription}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{mb: 2}}
                    />)}
                    {/* Контакты!!! */}
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <ContactsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Contacts" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List
                        component="div"
                        disablePadding
                        sx={{ display: 'flex', flexDirection: 'column', maxHeight: '300px', overflowY: 'auto', paddingRight: '8px'}}
                        id="listForm">
                        {Object.keys(props.profile.contacts).map(key => (
                            <TextField
                                key={key}
                                label={key}
                                variant="outlined"
                                name={`contacts.${key}`}
                                fullWidth
                                value={values.contacts[key as keyof ContactsType] || ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                sx={{ mb: 2 }}
                            />
                        ))}
                        </List>
                    </Collapse>
                    {/* Контакты!!! */}
                    <Button type="submit" disabled={isSubmitting} variant="contained" fullWidth sx={{ m: 1}}>Save profile</Button>
                </Box>
            </Form>
        )}
    </Formik>
    )
  }


type PropsType = {
    profile: ProfileType | null
    onSubmit: (values: ProfileType) => void
}
type ValueType = {
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    contacts: ContactsType
    fullName: string
}
