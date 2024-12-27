import { connect } from 'react-redux';
import Navbar from'./Navbar.tsx';
import React from 'react';
import { AppStateType } from '../../redux/redux-store';


  let mapStateToProps = (state: AppStateType) => {
    return {
      sidebar: state.sidebar,
    }
  }

  let mapDispatchToProps = (dispatch) => {
    return {
      }
    }

  const NavbarContainer = connect(mapStateToProps,mapDispatchToProps) (Navbar);


  export default NavbarContainer;