import styles from './users.module.css'
import userPhoto from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';



let User = ({user, ...props}) => {
    return(
        <div className={styles.maindiv} key={user.id}>
        <div className={styles.leftcolumn}>
            {/* <img className={styles.images} src={u.photoUrl} alt={u.altimg} /> */}
            <NavLink to={'/profile/' + user.id}>
                <img className={styles.images} src={user.photos.small !=null ? user.photos.small : userPhoto} alt={user.altimg} />
            </NavLink>
            <span>
                {user.followed
                // ?  <button className={styles.buttonfollow} onClick={() => {props.unfollow(u.id)}}>Follow</button>
                // :  <button className={styles.buttonunfollow} onClick={() => {props.follow(u.id)}}>Unfollow</button>}
                ?  <button disabled={props.followingInProgress.some(id => id === user.id)} className={styles.buttonfollow} onClick={() => {
                    props.unfollow(user.id);
                }}>Unfollow</button>
                :  <button disabled={props.followingInProgress.some(id => id === user.id)} className={styles.buttonunfollow} onClick={() => {
                    props.follow(user.id);
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