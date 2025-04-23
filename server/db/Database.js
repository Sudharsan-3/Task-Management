import express from "express";
import pg from "pg"
import dotenv from "dotenv"
import cors from "cors";

const app = express()


dotenv.config()

const db = new pg.Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DATABASE_PORT,
});

db.connect();
app.use(cors());


export default db ;