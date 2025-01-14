import React, {FC} from 'react';
import { UsersType } from '../../types/types.ts';
import Paginator from '../Common/Paginator/Paginator.tsx';
import User from './User.tsx';
import { Field, Form, Formik } from 'formik';
import styles from './users.module.css';
import {UserSearchForm} from './UsersSearchForm.tsx';
import { FilterType } from '../../redux/users-reducer.ts';


type PropsType = {
    currentPage: number,
    totalUsersCount: number,
    pageSize: number,
    onPageChanged: () => void,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    users: Array <UsersType>,
    followingInProgress: Array <number>,
    onFilterChanged:(filter: FilterType) => void,
}

let Users: FC<PropsType> = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, followingInProgress, unfollow, follow, onFilterChanged}) => {
    return(
        <div>
            <UserSearchForm onFilterChanged = {onFilterChanged} />
            <Paginator currentPage = {currentPage} onPageChanged = {onPageChanged} totalUsersCount= {totalUsersCount} pageSize = {pageSize}/>
            {
        users.map(u => <User key={u.id} user = {u} followingInProgress = {followingInProgress} follow = {follow} unfollow = {unfollow}/>)
            }
        </div>
    )
}


export default Users