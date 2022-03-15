const INITIAL_STATE = {
  currentUser: typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem("currentUser")) : {},
  users: [],
  loading: false,
  errorMessage: undefined
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_START_USER":
      return {
        ...state,
        loading: true
      };
    case "SET_CURRENT_USER":
      sessionStorage.setItem('currentUser', JSON.stringify(action.payload));
      return {
        ...state,
        currentUser: action.payload,
        loading: false
      };
    case "LOGIN_SUCCESS":
      sessionStorage.setItem('currentUser', JSON.stringify(action.payload));
      return {
        ...state,
        currentUser: action.payload,
        loading: false
      };
    case "FETCH_FAILURE_USER":
      return {
        ...state,
        errorMessage: action.payload,
        loading: false
      };
    case "FETCH_SUCCESS_USER":
      return {
        ...state,
        loading: false
      };
    case "LOGOUT":
      sessionStorage.removeItem('currentUser');
      return {
        ...state,
        currentUser: null,
        loading: false
      };
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default userReducer;