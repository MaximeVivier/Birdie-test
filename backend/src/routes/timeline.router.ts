import connection from '../database';

const numberOf = (req: any, res: any) => {
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

export default numberOf;
