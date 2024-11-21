import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import morgan from 'morgan'
import taskRoutes from './routes/tasks.routes.js';
import authRoutes from './routes/auth.routes.js';
import pythonRoutes from './routes/python.routes.js';
import cardRoutes from './routes/card.routes.js';
import cookieParse from 'cookie-parser';
import cors from 'cors';
import { ORIGIN } from "./config.js";
import { pool } from "./db.js";

const app=express();

//Middlewares
app.use(
    cors({
      origin: ORIGIN,
      credentials: true,
    })
  );
app.use(morgan('dev'));
app.use(cookieParse());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Routes
app.get("/", (req, res) => res.json({message: "welcome to my API"}));
app.use('/api', taskRoutes);
app.use('/api', authRoutes);
app.use('/api', cardRoutes);
app.use('/api', pythonRoutes);
app.get("/api/ping", async (req, res) => {
    const result = await pool.query("SELECT NOW()");
    return res.json(result.rows[0]);
  });

//Error Hander
app.use((err, req, res, next)=>{
    res.status(500).json({
        status: "error",
        message: err.message,
    });
});

const port = process.env.PORT || 3000;  // O el puerto que prefieras
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;