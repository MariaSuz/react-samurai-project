import Profile from './Profile';
import React from 'react';
import { connect } from "react-redux";
import { profileMe, setUserId, profileStatus, updateProfileStatus } from "../../redux/profile-reducer";
import {useParams} from "react-router-dom";
import { compose } from "redux";
import LoginContainer from '../login/LoginContainer';

export function withRouter(Children){
    return(props)=>{
        const match  = {params: useParams()};
        return <Children {...props}  match={match}/>
    }
}

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUser;
            if (!userId) {
                return <LoginContainer />
            }
        }
        this.props.profileMe(userId);
        this.props.profileStatus(userId);
    }

    render () {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateProfileStatus={this.props.updateProfileStatus}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    userId: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    authorizedUser: state.auth.userId,
})

// let WithUrlDataContainerComponent = withRouter(ProfileContainer);

// export default connect(mapStateToProps, {profileMe, setUserId}) (WithUrlDataContainerComponent);

export default compose(
    connect(mapStateToProps, {profileMe, setUserId, profileStatus, updateProfileStatus}),
    withRouter
  )(ProfileContainer);