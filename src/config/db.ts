import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'gimni',
});

if (connection) {
  console.log('Database connected');
}

export default connection;
