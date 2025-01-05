import Profile from './Profile.tsx';
import React from 'react';
import { connect } from "react-redux";
import { profileMe, profileStatus, updateProfileStatus, savePhoto, saveProfile } from "../../redux/profile-reducer.ts";
import {useParams} from "react-router-dom";
import { compose } from "redux";
import LoginContainer from '../login/LoginContainer.tsx';
import withAuthRedidirect from '../../hoc/AuthRedirect.js';
import { AppStateType } from '../../redux/redux-store.ts';
import { ProfileType } from '../../types/types.ts';


export function withRouter(Children: React.ComponentType<any>) {
    return (props) => {
        const match = { params: useParams() };
        return <Children {...props} match={match} />
    }
}


let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    // userId: state.profilePage.userId,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    authorizedUser: state.auth.userId,
})
type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    profileMe: (userId: number) => void
    profileStatus: (userId: number) => void
    updateProfileStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
    userId: string;
};

type PropsType = MapPropsType & DispatchPropsType & { match: { params: PathParamsType } };

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUser;
            if (!userId) {
                return <LoginContainer />
            }
        }
        this.props.profileMe(userId);
        this.props.profileStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
        this.refreshProfile()}
    }

    render () {
        return (
            <Profile {...this.props}
            profile={this.props.profile}
            status={this.props.status}
            updateProfileStatus={this.props.updateProfileStatus}
            isOwner={!this.props.match.params.userId}
            savePhoto={this.props.savePhoto} />
        )
    }
}

// let WithUrlDataContainerComponent = withRouter(ProfileContainer);

// export default connect(mapStateToProps, {profileMe, setUserId}) (WithUrlDataContainerComponent);

export default compose<React.ComponentType>(
    connect(mapStateToProps, { profileMe, profileStatus, updateProfileStatus, savePhoto, saveProfile }),
    withRouter,
    withAuthRedidirect
  )(ProfileContainer);