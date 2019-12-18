import initialState from './initialState';

const { current_recipient_id, all_recipients_options } = initialState;

const currentRecipient = (state: string = current_recipient_id, action: { type: string, payload: string }) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_RECIPIENT':
      return action.payload;
    default:
      return state;
  }
};

const allRecipient = (
    state: Array<{key: string, value: string, text: string}> = all_recipients_options,
    action: { type: string, payload: string }
  ) => {
  switch (action.type) {
    case 'FIND_ALL_RECIPIENT':
      return action.payload;
    default:
      return state;
  }
};

export { currentRecipient, allRecipient };