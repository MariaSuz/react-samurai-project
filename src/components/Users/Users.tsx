import React, {FC, useEffect} from 'react';
import Paginator from '../Common/Paginator/Paginator.tsx';
import User from './User.tsx';
import {UserSearchForm} from './UsersSearchForm.tsx';
import {  follow as followAC, unfollow as unfollowAC, FilterType, getUsersThunk } from '../../redux/users-reducer.ts';
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/users-selectors.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/redux-store.ts';


type PropsType = {

}


export const Users: FC<PropsType> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const followingInProgress = useSelector(getFollowingInProgress)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsers)


    useEffect(() => {
        dispatch(getUsersThunk(currentPage, pageSize, filter))
    }, [])

    const dispatch:AppDispatch = useDispatch()

    const onPageChanged = (pageNumber: number) =>  {
        dispatch(getUsersThunk(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) =>  {
        dispatch(getUsersThunk(currentPage, pageSize, filter))
    }
    const follow = (userId: number) => {
        dispatch(followAC(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowAC(userId))
    }

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
