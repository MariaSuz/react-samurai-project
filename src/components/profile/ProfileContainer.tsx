import Profile from './Profile.tsx';
import React from 'react';
import { connect } from "react-redux";
import { actions } from "../../redux/profile-reducer.ts";
import {useParams} from "react-router-dom";
import { compose } from "redux";
import LoginContainer from '../login/LoginContainer.tsx';
import { withAuthRedidirect } from '../../hoc/AuthRedirect.tsx';
import { AppStateType } from '../../redux/redux-store.ts';
import { ProfileType } from '../../types/types.ts';


export function withRouter(Children: React.ComponentType<any>) {
    return (props) => {
        const match = { params: useParams() };
        return <Children {...props} match={{match}} />
    }
}

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

    componentDidUpdate(prevProps: PropsType) {
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

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    userId: state.profilePage.profile,
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
    userId: number;
};

type PropsType = MapPropsType & DispatchPropsType & { match: { params: PathParamsType } };

// let WithUrlDataContainerComponent = withRouter(ProfileContainer);

// export default connect(mapStateToProps, {profileMe, setUserId}) (WithUrlDataContainerComponent);

export default compose(
    connect(mapStateToProps, {...actions}),
    withRouter,
    withAuthRedidirect
  )(ProfileContainer);