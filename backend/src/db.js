import pg from 'pg';

export const pool = new pg.Pool({
    port: 5432,
    host: "localhost",
    user: "postgres",
    password: "",
    database: "mind_boost_db"
});

pool.on("connect", () => {
    console.log("Database Connected");
})
