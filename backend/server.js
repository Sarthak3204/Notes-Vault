import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'//frontend port
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/blog", blogRoutes);

app.get('/', (req, res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port http://localhost:${port}`));