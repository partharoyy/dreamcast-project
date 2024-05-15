import { fetchUsersFromApi } from '../../services/api';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const ADD_USER = 'ADD_USER';
export const EDIT_USER = 'EDIT_USER';
export const DELETE_USER = 'DELETE_USER';

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const editUser = (user) => ({
  type: EDIT_USER,
  payload: user,
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id,
});

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUsersRequest());
    try {
      const users = await fetchUsersFromApi();
      dispatch(fetchUsersSuccess(users));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };
};
