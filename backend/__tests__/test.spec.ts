import * as request from 'supertest';
import app from '../src/application'

describe('Get Table routes', async () => {
  it('should get the id of all care recipient', async () => {
    const all_recipient_id = await request(app).get('/api/table/all-care-recipient-id');
    expect(all_recipient_id.status).toEqual(200);
    expect(all_recipient_id.body).toEqual([
      { care_recipient_id: "df50cac5-293c-490d-a06c-ee26796f850d" },
      { care_recipient_id: "e3e2bff8-d318-4760-beea-841a75f00227" },
      { care_recipient_id: "ad3512a6-91b1-4d7d-a005-6f8764dd0111" }
    ]);
  })

  it('should get the visits of the first care recipient', async () => {
    const firstRecipientId = {care_recipient_id: 'df50cac5-293c-490d-a06c-ee26796f850d'};
    const visits = await request(app).get(`/api/table/all-distinct-of-field/visit_id?care_recipient_id=${firstRecipientId.care_recipient_id}`);
    const random_visits_of_this_recipient = [
      {
        timestamp: "2019-04-25T07:10:45.898Z",
        visit_id: "2ddc3653-521f-11e9-b63f-06a80bfbb33e"
      },
      {
        timestamp: "2019-04-30T11:46:53.118Z",
        visit_id: "5cc781f0-8b66-f8a8-43f3-5c958d04af16"
      }
    ];
    expect(visits.status).toEqual(200);
    expect(visits.body).toEqual(expect.arrayContaining(random_visits_of_this_recipient));
  })

  it('should get the events of a visit and check if there are a check in and a check out', async () => {
    const random_visit = { visit_id: "5cc781f0-8b66-f8a8-43f3-5c958d04af16" };
    const events = await request(app).get(`/api/table/events-of-visit/${random_visit.visit_id}`);
    const random_event = [
      expect.objectContaining({
        event_type: 'check_in',
        visit_id: '5cc781f0-8b66-f8a8-43f3-5c958d04af16'
      }),
      expect.objectContaining({
        event_type: 'check_out',
        visit_id: '5cc781f0-8b66-f8a8-43f3-5c958d04af16'
      }),
    ];
    expect(events.status).toEqual(200);
    expect(events.body).toEqual(expect.arrayContaining(random_event));
  })

})
