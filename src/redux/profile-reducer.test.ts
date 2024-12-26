import profileReducer, { actions } from "./profile-reducer";
//Не видит, поэтому импорт. ошибка ушла
import { expect, test } from '@jest/globals';

let state = {
  postData: [
    {id: 1, message: 'Hello', likesCount: 0},
    {id: 2, message: 'I want car', likesCount: 110},
    {id: 3, message: 'Hello', likesCount: 10},
    {id: 4, message: 'Its my firts post', likesCount: 1},
  ],
  profile: null,
  status: '' ,
  userId: 31414 ,
}

test('new post length ++', () => {
  //1. test data
  let action = actions.addPost('new post');

  //2. action
  let newState = profileReducer (state, action);

  //3. expectation
  expect(newState.postData.length).toBe(5);
});

test('post 4 messages should be correct', () => {
  //1. test data
  let action = actions.addPost('new post');

  //2. action
  let newState = profileReducer (state, action);

  //3. expectation
  expect(newState.postData[4].message).toBe('new post');
});


test('after deleting length of message sholud be decrement', () => {
  //1. test data
  let action = actions.deletePost(1);

  //2. action
  let newState = profileReducer (state, action);

  //3. expectation
  expect(newState.postData.length).toBe(3);
});

