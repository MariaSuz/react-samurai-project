import { expect, test, jest} from '@jest/globals';
import { follow } from './users-reducer';
import { usersAPI } from '../api/users-api';
import { ResponseType, ResultCodeEnum } from '../api/api';
jest.mock('../api/users-api');

const userAPIMock = usersAPI;

const result: ResponseType = {
  data: {},
  messages: [],
  resultCode: ResultCodeEnum.Success
}

// @ts-ignore
userAPIMock.postFollowerApi.mockReturnValue(result)

test( '', async () => {

  const thunk = follow(1)
  const dispatchMock = jest.fn(); //Заглушка для диспатча

  //@ts-ignore
  await thunk(dispatchMock)

  expect(dispatchMock).toBeCalledTimes(3)   //Был вызван определенное кол-во раз

})