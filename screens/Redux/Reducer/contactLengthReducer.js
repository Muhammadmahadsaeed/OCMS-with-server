const ADD_TO_CONTACT_COUNT = 'ADD_TO_CONTACT_COUNT';
const REMOVE_FROM_CONTACT_COUNT = 'REMOVE_FROM_CONTACT_COUNT';
const REMOVE_ALL_CONTACT_COUNT = 'REMOVE_ALL_CONTACT_COUNT';

const initialState = {
  contactLength: 0,
};
const contactLengthCounter = (state = initialState, action) => {
  
  switch (action.type) {
    case ADD_TO_CONTACT_COUNT: {
      return {
        ...state,
        contactLength: action.payload,
      };
    }
    case REMOVE_FROM_CONTACT_COUNT:
    // return cout.filter((counter) => cou.productId !== action.payload.productId);
    case REMOVE_ALL_CONTACT_COUNT:
      return null;
  }
  return state;
};

export default contactLengthCounter;
