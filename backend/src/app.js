import express from 'express'
import morgan from 'morgan'
import taskRoutes from './routes/tasks.routes.js';
import authRoutes from './routes/auth.routes.js';
import cardRoutes from './routes/card.routes.js';
import cookieParse from 'cookie-parser';
import cors from 'cors';
const app=express();

//Middlewares
app.use(
    cors({
        origin: 'http://localhost:5173',
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


//Error Hander
app.use((err, req, res, next)=>{
    res.status(500).json({
        status: "error",
        message: err.message,
    });
});

export default app;