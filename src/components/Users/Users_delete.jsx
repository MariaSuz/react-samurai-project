import React from "react";
import styles from './users.module.css'
import axios from "axios";
import userPhoto from '../../assets/images/user.png';


let Users = (props) => {
    let getUsers = () => {
        if(props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
             debugger;
             props.setUsers(response.data.items)
            });
         // props.setUsers( [
         //      {id: 1, photoUrl: 'https://pushinka.top/uploads/posts/2023-04/1680542456_pushinka-top-p-avatarka-di-kaprio-avatarka-pinterest-43.png', altimg: 'phomoimghttps', followed: true, fullname: 'Galya', status: 'like cats', location: {city: 'Minsk', country: 'Belarus'}},
         //      {id: 2, photoUrl: 'https://pushinka.top/uploads/posts/2023-04/1680542456_pushinka-top-p-avatarka-di-kaprio-avatarka-pinterest-43.png', altimg: 'phomoimghttps',followed: true, fullname: 'Mariia', status: 'I give fitness lessons', location: {city: 'Samara', country: 'Russia'}},
         //      {id: 3, photoUrl: 'https://pushinka.top/uploads/posts/2023-04/1680542456_pushinka-top-p-avatarka-di-kaprio-avatarka-pinterest-43.png', altimg: 'phomoimghttps',followed: false, fullname: 'Daniel', status: 'I teach football', location: {city: 'Madrid', country: 'Span'}},
         //      {id: 4, photoUrl: 'https://i.pinimg.com/736x/3d/bf/b0/3dbfb0db73db8c521dd5792b509da8d9.jpg', altimg: 'phomoimghttps',followed: false, fullname: 'Ingrid', status: 'I like JS', location: {city: 'Berlin', country: 'Germany'}},
         //      {id: 5, photoUrl: 'https://i.pinimg.com/736x/3d/bf/b0/3dbfb0db73db8c521dd5792b509da8d9.jpg', altimg: 'phomoimghttps',followed: false, fullname: 'Francisco', status: 'work at the factory', location: {city: 'Lisbon', country: 'Portugal'}},
         //      {id: 6, photoUrl: 'https://i.pinimg.com/736x/3d/bf/b0/3dbfb0db73db8c521dd5792b509da8d9.jpg', altimg: 'phomoimghttps',followed: false, fullname: 'Sakura', status: 'just registered', location: {city: 'Tokyo', country: 'Japan'}},
         //   ]
         // ) 
    };
    }
    return(
    <div>
        <button onClick={getUsers}>Get Users</button>
        {
       props.users.map(u => <div className={styles.maindiv} key={u.id}>
        <div className={styles.leftcolumn}>
            {/* <img className={styles.images} src={u.photoUrl} alt={u.altimg} /> */}
            <img className={styles.images} src={u.photos.small !=null ? u.photos.small : userPhoto} alt={u.altimg} />
            <span>
                {u.followed
                ?  <button className={styles.buttonfollow} onClick={() => {props.unfollow(u.id)}}>Follow</button>
                :  <button className={styles.buttonunfollow} onClick={() => {props.follow(u.id)}}>Unfollow</button>}
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