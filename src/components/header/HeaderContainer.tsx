import Header from'./Header.tsx';
import React from 'react';
import { connect } from 'react-redux';
import { getLogOut } from '../../redux/auth-reducer.ts';
import { AppStateType } from '../../redux/redux-store.ts';
import { MapPropsType, DispatchPropsType } from './Header.tsx';



class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {
  // componentDidMount() {
  //   // axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
  //   //   withCredentials: true
  //   // })
  //   // .then(response => {
  //   //   if (response.data.resultCode === 0) {
  //   //     let {id, login, email} = response.data.data
  //   //     this.props.setAuthUserData(id, login, email);
  //   //   }
  //   // });
  //   this.props.getAuth();
  // }

  render () {
    return <Header {...this.props}/>
  }

}

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType> (mapStateToProps, {getLogOut}) (HeaderContainer);