import usersReducer, { initialStateType, actions } from "./users-reducer";
import { expect, test, beforeEach } from '@jest/globals';

let state: initialStateType;

beforeEach( () => {
  state = {
    users: [
      { id: 0, name: 'Masha', status: 'no status', photos: {small: null, large: null}, followed: false },
      { id: 1, name: 'Petya', status: 'in progres...', photos: {small: null, large: null}, followed: true },
      { id: 2, name: 'Lusia', status: 'zero', photos: {small: null, large: null}, followed: true },
      { id: 3, name: 'Max', status: 'no', photos: {small: null, large: null}, followed: false },
    ],
    pageSize: 5 ,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
  }
})

test('follow success', () => {
  const newState = usersReducer(state, actions.followSuccess(3))
  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[3].followed).toBeTruthy();
})

test('unfollow success', () => {
  const newState = usersReducer(state, actions.unfollowSuccess(1))
  expect(newState.users[1].followed).toBeFalsy();
  expect(newState.users[2].followed).toBeTruthy();
})

