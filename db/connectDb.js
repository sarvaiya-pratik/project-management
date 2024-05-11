import pg from 'pg'

const pool = new pg.Pool({
  user: 'system5',
  password: 'silico@123',
  host: 'localhost',
  port: '5432',
  database: 'project-management',
})

export default pool;













// host: 'localhost',
// user: 'postgres',
// port: 5432,
// password: 'pratik125',
// database: 'project-management',