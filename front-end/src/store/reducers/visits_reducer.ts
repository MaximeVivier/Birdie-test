import initialState from './initialState';

const { visits } = initialState;

const visitsReducer = (state: Array<object> = visits, action: { type: string, payload: string }) => {
  switch (action.type) {
    case 'CHANGE_RECIPIENT_VISITS':
      return action.payload;
    default:
      return state;
  }
};

export default visitsReducer;