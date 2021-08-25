import {DonationActions} from '../types';

const initialState = {
  donations: [],
};

const donationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case DonationActions.SET_DONATIONS:
      return {
        ...state,
        donations: action.payload,
      };
    default:
      return state;
  }
};

export default donationReducer;
