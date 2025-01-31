import styles from './users.module.css'
import userPhoto from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';
import React, { FC } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { UsersType } from '../../types/types';


const User: FC<PropsType> = ({user, followingInProgress, unfollow, follow, status}) => {
    const commonStyles = {
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
        borderRadius: '16px',
      };

    return(
        <Card sx={{  ...commonStyles, width: 300, borderColor: 'primary.main'}}>
            <CardMedia
            component="img"
            alt={user.name}
            height="140"
            image= {user.photos.large !=null ? user.photos.large : userPhoto}
            sx={{ height: 140 }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {user.name} 
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {user.status? `${user.status}` : `User don't have a status`}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex',  flexWrap: 'wrap', justifyContent: 'space-between'}}>
                <NavLink to={'/profile/' + user.id}><Button variant="text">User profile</Button></NavLink>
                {user.followed
                    // ?  <button className={styles.buttonfollow} onClick={() => {props.unfollow(u.id)}}>Follow</button>
                    // :  <button className={styles.buttonunfollow} onClick={() => {props.follow(u.id)}}>Unfollow</button>}
                    ?  <Button color="error" variant="contained" disabled={followingInProgress.some(id => id === user.id)}  onClick={() => {
                        unfollow(user.id);
                    }}>Unfollow</Button>
                    :  <Button variant="contained" disabled={followingInProgress.some(id => id === user.id)}  onClick={() => {
                        follow(user.id);
                        }}>Follow</Button>}
            </CardActions>
        </Card>
    )
}

type PropsType = {
    followingInProgress: Array<number>,
    user: UsersType,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
    status: (userId: number) => void
}

export default User