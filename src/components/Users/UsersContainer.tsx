
import { connect } from "react-redux";
import { follow, unfollow, getUsersThunk, actions, FilterType } from "../../redux/users-reducer.ts";
import React from "react";
import Users from "./Users.tsx";
import Preloader from "../Common/Preloader/Preloader.tsx";
import { compose } from "redux";
import { getCurrentPage, getUsers, getPageSize,  getTotalUsersCount, getFetching, getFollowingInProgress, getUsersFilter } from "../../redux/users-selectors.ts";
import { UsersType } from "../../types/types.ts";
import { AppStateType } from "../../redux/redux-store.ts";


let mapStateToProps = (state: AppStateType ): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state),
    }
}

type MapStatePropsType = {
    currentPage: number,
    pageSize: number,
    setCurrentPage: (pageNumber: number) => void,
    isFetching: boolean,
    totalUsersCount: number,
    users: Array<UsersType>,
    followingInProgress: Array<number>,
    filter: FilterType,
}
type MapDispatchPropsType = {
    getUsersThunk: (currentPage: number, pageSize: number, filter: FilterType) => void,
    follow: () => void,
    unfollow: () => void,
}

type PropsType = MapDispatchPropsType & MapStatePropsType;

class UsersAPIComponent extends React.Component<PropsType> {

    componentDidMount(){
        const {currentPage, pageSize, filter} = this.props;
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize, filter);
    }

    onPageChanged = (pageNumber: number) => {
        const {filter, pageSize} = this.props;
        this.props.setCurrentPage(pageNumber);
        this.props.getUsersThunk(pageNumber, this.props.pageSize, filter);
    }

    onFilterChanged = (filter: FilterType) => {
        const {currentPage, pageSize} = this.props;
        this.props.getUsersThunk(currentPage, pageSize, filter);
    }

    render() {
        return <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged ={this.onPageChanged}
            users ={this.props.users}
            unfollow ={this.props.unfollow}
            follow ={this.props.follow}
            followingInProgress = {this.props.followingInProgress}
            onFilterChanged = {this.props.onFilterChanged} />
        </>
    }
}

// export default connect(mapStateToProps,  {
//     follow: followActionCreator,
//     unfollow: unfollowActionCreator,
//     setUsers: setUsersActionCreator,
//     setCurrentPage: currentPageActionCreator,
//     settotalUsersCount: settotalUsersCountActionCreator,
//     toggleIsFetching: toggleIsFetchingAC
// })(UsersAPIComponent);

//Сокращаем ActionCreator , те именуем одинаково примеры как было с фоллов

// export default connect(mapStateToProps,  {
//     follow,
//     unfollow,
//     // setUsers,
//     setCurrentPage,
//     // settotalUsersCount,
//     // toggleIsFetching,
//     // togglefollowingInProgress,
//     getUsersThunk
// })(UsersAPIComponent);

export default compose(
    connect(mapStateToProps,  {
        follow,
        unfollow,
        ...actions,
        getUsersThunk
    })
  )(UsersAPIComponent);