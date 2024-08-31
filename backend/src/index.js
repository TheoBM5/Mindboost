import dotenv from 'dotenv';

console.log("DB_HOST:", process.env.DB_HOST);
import app from './app.js';


app.listen(3000);
console.log("Server on port", 3000);