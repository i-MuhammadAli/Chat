const initialState = {
  user: null,
  isLoading: false,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'AUTH_PENDING':
    case 'PROFILE_SETUP_PENDING':
      return { ...state, isLoading: true };
    case 'AUTH_SUCCESS':
      return { ...state, user: action.payload, isLoading: false };
    case 'AUTH_REJECTED':
    case 'PROFILE_SETUP_REJECTED':
      return { ...state, isLoading: false };
    case 'PROFILE_SETUP_SUCCESS':
      return { ...state, user: { ...state.user, ...action.payload }, isLoading: false };
    case 'LOGOUT_SUCCESS':
      return { ...state, user: null };
    default:
      return state;
  }
};

export default authReducer;
