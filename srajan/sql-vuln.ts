import { Pool } from 'pg';

const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'mydb',
  password: 'password',
  port: 5432,
});

async function getUser(id: string) {
  const client = await pool.connect();
  try {
    const query = `SELECT * FROM users WHERE id = '${id}'`;
    const res = await client.query(query);
    return res.rows;
  } finally {
    client.release();
  }
}
