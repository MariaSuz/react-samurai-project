import Paginator from '../Common/Paginator/Paginator.tsx';
import User from './User';




let Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, ...props}) => {
    return(
        <div>
            <Paginator currentPage = {currentPage} onPageChanged = {onPageChanged} totalUsersCount= {totalUsersCount} pageSize = {pageSize}/>
            {
        props.users.map(u => <User key={u.id} user = {u} followingInProgress = {props.followingInProgress} follow = {props.follow} unfollow = {props.unfollow}/>)
            }
        </div>
    )
}


export default Users