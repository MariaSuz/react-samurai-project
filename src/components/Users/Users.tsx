import React, {FC} from 'react';
import { UsersType } from '../../types/types.ts';
import Paginator from '../Common/Paginator/Paginator.tsx';
import User from './User.tsx';


type PropsType = {
    currentPage: number,
    totalUsersCount: number,
    pageSize: number,
    onPageChanged: () => void,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    users: Array <UsersType>,
    followingInProgress: Array <number>,
}

let Users: FC<PropsType> = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, followingInProgress, unfollow, follow}) => {
    return(
        <div>
            <Paginator currentPage = {currentPage} onPageChanged = {onPageChanged} totalUsersCount= {totalUsersCount} pageSize = {pageSize}/>
            {
        users.map(u => <User key={u.id} user = {u} followingInProgress = {followingInProgress} follow = {follow} unfollow = {unfollow}/>)
            }
        </div>
    )
}


export default Users