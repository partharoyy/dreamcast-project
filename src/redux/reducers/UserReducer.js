import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
} from '../actions/UserActions';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case EDIT_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id
            ? {
                ...user,
                name: action.payload.name || user.name,
                email: action.payload.email || user.email,
                phone: action.payload.phone || user.phone,
                address: {
                  ...user.address,
                  city: action.payload.city || user.address.city,
                  zipcode: action.payload.zipcode || user.address.zipcode,
                },
              }
            : user
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;
