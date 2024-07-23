import React from "react";
import styles from './users.module.css'
import axios from "axios";
import userPhoto from '../../assets/images/user.png';


class Users extends React.Component {

    componentDidMount(){
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            this.props.setUsers(response.data.items)
           });
    }


    render() {
        return(
            <div>
                {
               this.props.users.map(u => <div className={styles.maindiv} key={u.id}>
                <div className={styles.leftcolumn}>
                    {/* <img className={styles.images} src={u.photoUrl} alt={u.altimg} /> */}
                    <img className={styles.images} src={u.photos.small !=null ? u.photos.small : userPhoto} alt={u.altimg} />
                    <span>
                        {u.followed
                        ?  <button className={styles.buttonfollow} onClick={() => {this.props.unfollow(u.id)}}>Follow</button>
                        :  <button className={styles.buttonunfollow} onClick={() => {this.props.follow(u.id)}}>Unfollow</button>}
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
}


export default Users