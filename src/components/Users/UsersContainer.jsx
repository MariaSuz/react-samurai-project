
import { connect } from "react-redux";
// import { followActionCreator, setUsersActionCreator, unfollowActionCreator, currentPageActionCreator, settotalUsersCountActionCreator, toggleIsFetchingAC } from "../../redux/users-reducer";
import { followActionCreator, setUsers, unfollowActionCreator, setCurrentPage, settotalUsersCount, toggleIsFetching} from "../../redux/users-reducer";
import React from "react";
import axios from "axios";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching

    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followActionCreator(userId))
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowActionCreator(userId))
//         },
//         setUsers: (users) => {
//             dispatch(setUsersActionCreator(users))
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(currentPageActionCreator(pageNumber))
//         },
//         settotalUsersCount: (totalCount) => {
//             dispatch(settotalUsersCountActionCreator(totalCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }


class UsersAPIComponent extends React.Component {

    componentDidMount(){
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`,
        {   withCredentials: true
        })
        .then(response => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(response.data.items);
            this.props.settotalUsersCount(response.data.totalCount);
           });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`,
            {   withCredentials: true
            })
            .then(response => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(response.data.items)
           });
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
            follow ={this.props.follow}/>
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

export default connect(mapStateToProps,  {
    follow: followActionCreator,
    unfollow: unfollowActionCreator,
    setUsers,
    setCurrentPage,
    settotalUsersCount,
    toggleIsFetching
})(UsersAPIComponent);