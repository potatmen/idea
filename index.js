import express from "express"
import cors from "cors";
import { v4 as uuidv4 } from 'uuid';
import { WebSocketServer } from "ws";
import cryptoRouter from "./src/routers/cryptoRouter.js";
import http from 'http';

const app = express();
app.use(cors({ origin: true }));
app.set('trust proxy', true)

// parse requests of content-type - application/json
app.use(express.json({
    type: "*/*" // optional, only if you want to be sure that everything is parsed as JSON. Wouldn't recommend
}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/crypto", cryptoRouter);

const server = http.createServer(app);


// set port, listen for requests
const wsServer = new WebSocketServer({ server });

// Maintain active connections
const clients = {};

// Handle new client connections
wsServer.on("connection", function handleNewConnection(connection) {
    const userId = uuidv4();
    console.log("Received a new connection");

    clients[userId] = connection;
    console.log(`${userId} connected.`);

    connection.on("close", () => {
        console.log(`${userId} disconnected.`);
        delete clients[userId]
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});