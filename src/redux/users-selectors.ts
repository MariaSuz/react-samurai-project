import { createSelector } from 'reselect'
import { AppStateType } from './redux-store';
 const getUsersSelector = (state: AppStateType) => {
  return state.usersPage.users;
}
export const getUsers = createSelector(getUsersSelector, (users) => {
  return users.filter( u => true );
})
export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
}
export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount;
}
export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
}
export const getFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress;
}
export const getUsersFilter = (state: AppStateType) => {
  return state.usersPage.filter;
}
export const getisAuth = (state: AppStateType) => {
  return state.auth.isAuth;
}
export const getcaptchaUrl = (state: AppStateType) => {
  return state.auth.captchaUrl;
}
export const getLogin = (state: AppStateType) => {
  return state.auth.login;
}
export const getProfile = (state: AppStateType) => {
  return state.profilePage.profile;
}
export const getDialogs = (state: AppStateType) => {
  return state.messagesPage;
}
export const getMessagesChat = (state: AppStateType) => {
  return state.chat.messages;
}
export const getPostsProfile = (state: AppStateType) => {
  return state.profilePage.postData;
}
export const getInitialize = (state: AppStateType) => {
  return state.app.initialize;
}


