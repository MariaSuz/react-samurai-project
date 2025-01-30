import React, {FC, useEffect, useState} from 'react';
import Paginator from '../Common/Paginator/Paginator.tsx';
import User from './User.tsx';
import {UserSearchForm} from './UsersSearchForm.tsx';
import {  follow as followAC, unfollow as unfollowAC, FilterType, getUsersThunk, usersStatus } from '../../redux/users-reducer.ts';
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/users-selectors.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/redux-store.ts';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Pagination, Typography } from '@mui/material';


export const Users: FC = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const followingInProgress = useSelector(getFollowingInProgress)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsers)

    // useEffect(() => {
    //     history({
    //         pathname: `/users`,
    //         search:`?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
    //     })
    // }, [filter, currentPage])

    useEffect(() => {
        dispatch(getUsersThunk(currentPage, pageSize, filter))
    }, [])

    const dispatch:AppDispatch = useDispatch()
    // const history = useNavigate()

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
    const status = (userId: number) => {
        dispatch(usersStatus(userId))
    }
    
    let pageCount = Math.ceil(totalUsersCount / pageSize);
    let [page, setPage] = useState(1);
    const handleChange = (e, p) => {
        onPageChanged(page)
        setPage(p);
      };

    return(
        <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', m: 2}}>
            <Accordion>
                <AccordionSummary
                aria-controls="panel1-content"
                id="panel1-header"
                >
                    <Typography component="span">Open user search form</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <UserSearchForm onFilterChanged = {onFilterChanged} />
                </AccordionDetails>
            </Accordion>
            {/* <UserSearchForm onFilterChanged = {onFilterChanged} /> */}
            <Pagination count={pageCount} color="primary" size="large" page={page} onChange={handleChange} sx={{ display: 'flex', my: 4, justifyContent: 'center' }}/>
            {/* <Paginator currentPage = {currentPage} onPageChanged = {onPageChanged} totalUsersCount= {totalUsersCount} pageSize = {pageSize}/> */}
            <Box sx={{ display: 'flex',  flexWrap: 'wrap', justifyContent: 'space-between'}}>
            {
            users.map(u => <User key={u.id} user = {u} followingInProgress = {followingInProgress} follow = {follow}  unfollow = {unfollow} status = {status}/>)
            }
            </Box>
        </Container>
    )
}
