import express from 'express';
import path from 'path';
import apiRoute from './routes/api.js'
import { fileURLToPath } from 'url';

const PORT = 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use("/api", apiRoute);
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, ()=>{
    console.log("Server running on port", PORT)
});