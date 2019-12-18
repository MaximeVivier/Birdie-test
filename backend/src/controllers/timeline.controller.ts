import connection from '../database';

const ping = (_: any, res: any) => {
  connection.query('SELECT DISTINCT visit_id FROM events', (error: any, results: object[]) => {
    if (error) { throw error };
    res.status(200).json(results.length);
  });
}

module.exports = { ping };
