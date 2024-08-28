import pg from 'pg';

export const pool = new pg.Pool({
    port: 5432,
    host: "localhost",
    // host: "database",
    user: "postgres",
    password: "Pachamama2",
    database: "mind_boost_db"
});

pool.on("connect", () => {
    console.log("Database Connected");
})