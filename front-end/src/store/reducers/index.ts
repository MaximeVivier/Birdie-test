import { combineReducers } from 'redux';
import { currentRecipient, allRecipient } from './care_recipent_reducer';
import visits_reducer from './visits_reducer';

export type RootState = Readonly<{
  current_recipient_id: string,
  all_recipients_options: Array<{key: string, value: string, text: string}>,
  visits: Array<object>
}>;

export const rootReducer = combineReducers<RootState>({
  current_recipient_id: currentRecipient,
  all_recipients_options: allRecipient,
  visits: visits_reducer
});