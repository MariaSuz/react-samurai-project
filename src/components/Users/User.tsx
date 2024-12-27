import styles from './users.module.css'
import userPhoto from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';
import React, { FC } from 'react';
import { UsersType } from '../../types/types';

type PropsType = {
    followingInProgress: Array<number>,
    user: UsersType,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void

}

const User: FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return(
        <div className={styles.maindiv} key={user.id}>
        <div className={styles.leftcolumn}>
            <NavLink to={'/profile/' + user.id}>
                <img className={styles.images} src={user.photos.small !=null ? user.photos.small : userPhoto} alt='userPhoto' />
            </NavLink>
            <span>
                {user.followed
                // ?  <button className={styles.buttonfollow} onClick={() => {props.unfollow(u.id)}}>Follow</button>
                // :  <button className={styles.buttonunfollow} onClick={() => {props.follow(u.id)}}>Unfollow</button>}
                ?  <button disabled={followingInProgress.some(id => id === user.id)} className={styles.buttonfollow} onClick={() => {
                    unfollow(user.id);
                }}>Unfollow</button>
                :  <button disabled={followingInProgress.some(id => id === user.id)} className={styles.buttonunfollow} onClick={() => {
                    follow(user.id);
                      }}>Follow</button>}

            </span>
        </div>
        <div className={styles.rightcolumn}>
            <div className={styles.namecountry}>
                <div>
                    <span>{user.name}</span>
                </div>
                <div className={styles.countrycity}>
                    <span>{'user.location.country'}</span>
                    <span>{'user.location.city'}</span>
                </div>
            </div>
            <span className={styles.statusspan}>{user.status}</span>
        </div>
        </div>)
}


export default User