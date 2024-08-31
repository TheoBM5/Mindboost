import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import pg from 'pg';
console.log("gola2",process.env.DB_HOST)

export const pool = new pg.Pool({
    port: process.env.DB_PORT,
    // host: "localhost",
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

pool.on("connect", () => {
    console.log("Database Connected");
})