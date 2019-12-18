import { getRequest } from './utils';

const getVisits = (care_recipient_id: string) => {
  return getRequest('table/all-distinct-of-field/visit_id', { care_recipient_id });
};

const getEventsOfVisit = (visit_id: string) => {
  return getRequest(`table/events-of-visit/${visit_id}`);
};

const getAllRecipientsId = () => {
  return getRequest(`table/all-care-recipient-id`);
};

export { getVisits, getEventsOfVisit, getAllRecipientsId };