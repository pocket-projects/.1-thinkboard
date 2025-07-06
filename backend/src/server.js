import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;



//Middleware is code that runs between the request and the response.

app.use(        // Middleware to enable CORS (Cross-Origin Resource Sharing)
    cors({      
        origin: "http://localhost:5173",
        credentials: true, // optional, useful for cookies/auth headers
})); 
app.use(express.json()); // Middleware to parse JSON request bodies: req.body
app.use(rateLimiter); // Apply rate limiting middleware

// // simple custom middleware
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} % Req URL is ${req.url}`);
//     next(); // Call next() to pass control to the next middleware or route handler
// });
 
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT,() => {
        console.log("Server is running on PORT:", PORT);
    });
});

