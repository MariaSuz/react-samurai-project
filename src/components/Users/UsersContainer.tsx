
import { connect } from "react-redux";
import { follow, unfollow, setCurrentPage, getUsersThunk} from "../../redux/users-reducer.ts";
import React from "react";
import Users from "./Users.tsx";
import Preloader from "../Common/Preloader/Preloader.js";
import { compose } from "redux";
import { getCurrentPage, getUsers, getPageSize,  getTotalUsersCount, getFetching, getFollowingInProgress } from "../../redux/users-selectors.ts";
import { UsersType } from "../../types/types.ts";
import { AppStateType } from "../../redux/redux-store.ts";


let mapStateToProps = (state: AppStateType ) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

type PropsType = {
    currentPage: number,
    pageSize: number,
    getUsersThunk: (currentPage: number, pageSize: number) => void,
    setCurrentPage: (pageNumber: number) => void,
    isFetching: boolean,
    totalUsersCount: number,
    follow: () => void,
    unfollow: () => void,
    users: Array<UsersType>,
    followingInProgress: Array<number>,
}


class UsersAPIComponent extends React.Component<PropsType> {

    componentDidMount(){
        const {currentPage, pageSize} = this.props;
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsersThunk(pageNumber, this.props.pageSize);
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
            followingInProgress = {this.props.followingInProgress}/>
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
        setCurrentPage,
        getUsersThunk
    })
  )(UsersAPIComponent);