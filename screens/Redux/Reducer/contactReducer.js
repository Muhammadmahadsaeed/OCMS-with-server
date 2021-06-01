const ADD_TO_CONTACT = 'ADD_TO_CONTACT';
const REMOVE_FROM_CONTACT = 'REMOVE_FROM_CONTACT';
const REMOVE_ALL_CONTACT = 'REMOVE_ALL_CONTACT';
const initialState = {
  contact: null,
};
const contact = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CONTACT: {
      return {
        ...state,
        contact: action.payload,
      };
    }
    case REMOVE_FROM_CONTACT:
    // return cout.filter((counter) => cou.productId !== action.payload.productId);
    case REMOVE_ALL_CONTACT:
      return null;
    // default:
    //   return state;
  }
  return state;
};

export default contact;
