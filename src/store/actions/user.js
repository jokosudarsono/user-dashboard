import { USER_SET_DATA } from 'store/types';

export const storeUser = (data) => {
  return {
    type: USER_SET_DATA,
    payload: data,
  };
};
