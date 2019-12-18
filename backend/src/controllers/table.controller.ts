import connection from '../database';

const allDistinctOfField = (req: any, res: any) => {
  try {
    const { field } = req.params;
    const { care_recipient_id } = req.query;
    const query = `SELECT ${field}, timestamp FROM events WHERE care_recipient_id="${care_recipient_id}" AND ${field} IS NOT NULL GROUP BY ${field}`;
    connection.query(query, (error: any, results: Array<{visit_id: string, timestamp: string }>) => {
      if (error) { throw error };
      res.status(200).json(results);
    });
  } catch (err) {
    res.status(404).end(err);
  }
};

const numberOfEvent = (req: any, res: any) => {
  try {
    const { event_type } = req.params;
    const { care_recipient_id } = req.query;
    const query = `SELECT COUNT(*) FROM events WHERE event_type="${event_type}" AND care_recipient_id="${care_recipient_id}"`;
    connection.query(query, (error: any, results: object[]) => {
      if (error) { throw error };
      res.status(200).json({ results });
    });
  } catch (err) {
    res.status(404).end(err);
  }
};

const allCareRecipientId = (_: any, res: any) => {
  try {
    const query = `SELECT DISTINCT care_recipient_id FROM events`;
    connection.query(query, (error: any, results: object[]) => {
      if (error) { throw error };
      res.status(200).json(results);
    });
  } catch (err) {
    res.status(404).end(err);
  }
};

const eventsOfVisit = (req: any, res: any) => {
  try {
    const { visit_id } = req.params;
    const query = `SELECT * FROM events WHERE visit_id="${visit_id}"`;
    connection.query(query, (error: any, results: Array<{payload: string}>) => {
      if (error) { throw error };
      res.status(200).json( results.map(result => JSON.parse(result.payload) ));
    });
  } catch (err) {
    res.status(404).end(err);
  }
};

module.exports = { allDistinctOfField, numberOfEvent, allCareRecipientId, eventsOfVisit };
