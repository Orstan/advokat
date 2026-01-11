import { sql } from '@vercel/postgres';

export async function query(sqlQuery: string, params: any[] = []) {
  const result = await sql.query(sqlQuery, params);
  return result.rows;
}

export { sql };
