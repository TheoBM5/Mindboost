import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import pg from 'pg';


export const pool = new pg.Pool({
    port: process.env.DB_PORT,
  
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

pool.on("connect", () => {
    console.log("Database Connected");
})