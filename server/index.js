import express from "express"
import cryptoRouter from "./src/routers/reqRouter.js";
import http from 'http';
import connectDB from "./src/db.js";

const app = express();
connectDB();

// parse requests of content-type - application/json
app.use(express.json({
    type: "*/*" // optional, only if you want to be sure that everything is parsed as JSON. Wouldn't recommend
}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/crypto", cryptoRouter);

const server = http.createServer(app);


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

