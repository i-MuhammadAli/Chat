const initialState = {
  friendRequests: [],
  sentRequests: [],
  isLoading: false,
};

const contactReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'FRIEND_REQUESTS_SUCCESS':
      return { ...state, friendRequests: action.payload };
    case 'SENT_FRIEND_REQUESTS_SUCCESS':
      return { ...state, sentRequests: action.payload };
    default:
      return state;
  }
};

export default contactReducer;
