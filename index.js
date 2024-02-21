import express from "express"
import cryptoRouter from "./src/routers/cryptoRouter.js";
import http from 'http';
import { startCronJob } from "./src/cronJob/cronJob.js";
import { Server } from "socket.io";

const app = express();

// parse requests of content-type - application/json
app.use(express.json({
    type: "*/*" // optional, only if you want to be sure that everything is parsed as JSON. Wouldn't recommend
}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/crypto", cryptoRouter);

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

global.mapObject = new Map();

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

startCronJob(io);