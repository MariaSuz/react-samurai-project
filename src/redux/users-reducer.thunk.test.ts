import { expect, test, jest} from '@jest/globals';
import { follow, actions } from './users-reducer';
import { usersAPI } from '../api/users-api';
import { ResponseType, ResultCodeEnum } from '../api/api';

jest.mock('../api/users-api');

const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const result: ResponseType = {
  data: {},
  messages: [],
  resultCode: ResultCodeEnum.Success
}



test( 'follow thunk should dispatch actions correctly', async () => {
  // Мокаем метод postFollowerApi
  userAPIMock.postFollowerApi.mockReturnValue(Promise.resolve(result))

  const thunk = follow(1)
  const dispatchMock = jest.fn(); //Заглушка для диспатча
  const getStateMock = jest.fn();


  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3);   //Был вызван определенное кол-во раз
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.togglefollowingInProgress(true, 1))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))

})