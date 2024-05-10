import pg from 'pg'

const pool = new pg.Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'pratik125',
  database: 'project-management',
})

export default pool;