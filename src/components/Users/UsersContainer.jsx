
import { connect } from "react-redux";
// import { followActionCreator, setUsersActionCreator, unfollowActionCreator, currentPageActionCreator, settotalUsersCountActionCreator, toggleIsFetchingAC } from "../../redux/users-reducer";
import { follow, setUsers, unfollow, setCurrentPage, settotalUsersCount, toggleIsFetching, togglefollowingInProgress, getUsersThunk} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import { compose } from "redux";
// import { usersAPI } from "../../api/api";

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress:state.usersPage.followingInProgress,

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

        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize);
        // this.props.toggleIsFetching(true);
        // usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
        //     this.props.toggleIsFetching(false);
        //     this.props.setUsers(data.items);
        //     this.props.settotalUsersCount(data.totalCount);
        //    });
    }

    onPageChanged = (pageNumber) => {

        this.props.setCurrentPage(pageNumber);
        // this.props.toggleIsFetching(true);
        this.props.getUsersThunk(pageNumber, this.props.pageSize);
        
        // usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
        //     this.props.toggleIsFetching(false);
        //     this.props.setUsers(data.items)
        //    });
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
            togglefollowingInProgress ={this.props.togglefollowingInProgress}
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