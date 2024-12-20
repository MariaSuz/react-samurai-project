import Header from'./Header';
import React from 'react';
import { connect } from 'react-redux';
import { getLogOut } from '../../redux/auth-reducer.ts';



class HeaderContainer extends React.Component {
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
    return (<Header {...this.props}/>)
  }

}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
});

export default connect (mapStateToProps, {getLogOut}) (HeaderContainer);