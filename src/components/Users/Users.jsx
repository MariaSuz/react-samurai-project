import styles from './users.module.css'
import userPhoto from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';
import { usersAPI } from '../../api/api';
import axios from 'axios';


let Users = (props) => {
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return(
        <div>
            <div className={styles.numbersdiv}>
                {pages.map(p => {
                    return <span className={props.currentPage === p && styles.selectedPage}
                    onClick = { (e) => {props.onPageChanged(p) }}> {p} </span>
                })}
            </div>
            {
        props.users.map(u => <div className={styles.maindiv} key={u.id}>
            <div className={styles.leftcolumn}>
                {/* <img className={styles.images} src={u.photoUrl} alt={u.altimg} /> */}
                <NavLink to={'/profile/' + u.id}>
                    <img className={styles.images} src={u.photos.small !=null ? u.photos.small : userPhoto} alt={u.altimg} />
                </NavLink>
                <span>
                    {u.followed
                    // ?  <button className={styles.buttonfollow} onClick={() => {props.unfollow(u.id)}}>Follow</button>
                    // :  <button className={styles.buttonunfollow} onClick={() => {props.follow(u.id)}}>Unfollow</button>}
                    ?  <button disabled={props.followingInProgress.some(id => id === u.id)} className={styles.buttonfollow} onClick={() => {
                        props.togglefollowingInProgress(true, u.id)
                        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,  {
                            withCredentials: true,
                            headers: {
                                "API-KEY": "5b479c9b-9199-48a5-ae7e-4ff0bdc2ca58"
                            }
                          })
                          .then(response => {
                            if (response.data.resultCode === 0) {
                                props.unfollow(u.id);
                            }
                            props.togglefollowingInProgress(false, u.id)
                          });

                    }}>Unfollow</button>
                    :  <button disabled={props.followingInProgress.some(id => id === u.id)} className={styles.buttonunfollow} onClick={() => {
                        props.togglefollowingInProgress(true, u.id)
                        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                            withCredentials: true,
                            headers: {
                                "API-KEY": "5b479c9b-9199-48a5-ae7e-4ff0bdc2ca58"
                            }
                          })
                          .then(response => {
                            if (response.data.resultCode === 0) {
                                props.follow(u.id);
                            }
                            props.togglefollowingInProgress(false, u.id)
                          });
                          }}>Follow</button>}

                    {/* // Кнопка не рабочая
                    // ?  <button disabled={props.followingInProgress} className={styles.buttonfollow} onClick={() => {
                    //     props.followingInProgress(true)
                    //     usersAPI.deleteFollowerApi(u.id)
                    //     .then(response => {
                    //                 if (response.data.resultCode === 0) {
                    //                     props.unfollow(u.id);
                    //                 }
                    //               });

                    // }}>Unfollow</button>
                    // :  <button disabled={props.followingInProgress} className={styles.buttonunfollow} onClick={() => {
                    //     props.followingInProgress(true)
                    //     usersAPI.postFollowerApi(u.id)
                    //     .then(response => {
                    //                 if (response.data.resultCode === 0) {
                    //                     props.follow(u.id);
                    //                 }
                    //               });
                    //       }}>Follow</button>}   */}
                </span>
            </div>
            <div className={styles.rightcolumn}>
                <div className={styles.namecountry}>
                    <div>
                        <span>{u.name}</span>
                    </div>
                    <div className={styles.countrycity}>
                        <span>{'u.location.country'}</span>
                        <span>{'u.location.city'}</span>
                    </div>
                </div>
                <span className={styles.statusspan}>{u.status}</span>
            </div>
            </div>)
            }
        </div>
        )
}


export default Users