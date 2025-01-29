
import { Box, Button, List, ListItem, ListItemText, ListSubheader, Typography } from '@mui/material';
import { ProfileType } from '../../../types/types';
import ProfileInfoCSS from'./ProfileInfo.module.css';
import React from 'react';

type PropsType = {
    profile: ProfileType | null,
    isOwner: boolean
}

export const ProfileForm: React.FC<PropsType> = (props) => {

    const keysValues = Object.keys(props.profile.contacts);
    let filtered = keysValues.filter(function(key) {
        return (props.profile.contacts[key])
    });
    return (
        <Box>
            <Typography variant="body1" gutterBottom>
                {props.profile.aboutMe}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Looking for a job: {props.profile.lookingForAJob ? 'yes' : 'no'}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {props.profile.lookingForAJob && `My skills: ${props.profile.lookingForAJobDescription || 'No description provided'}`}
            </Typography>

            <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Contacts
                </ListSubheader>
            }>
                {filtered.map(key =>
                    <ListItem style={{height: '30px'}}>
                        <ListItemText primary={<Typography variant="overline" style={{ color: '#49c0f0'}}>{`${key}: ${props.profile.contacts[key]}`}</Typography>}  />
                        {/* <ListItemText>{`${key}: ${props.profile.contacts[key]}`}</ListItemText> */}
                    </ListItem>
                )}
            </List>
            {props.isOwner &&( 
                    <Box textAlign='center' sx={{ m: 2}}>
                         <Button onClick = {props.goToEditMode} variant="contained">Refresh profile</Button>
                    </Box>
               )
            }
        </Box>
    )
  }
