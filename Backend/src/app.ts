import express from "express";
import http from "http";
import cors from "cors";
import { user } from "./routes/user";
import { thread } from "./routes/thread";
import { reply } from "./routes/reply";
import { initSocket } from "./socket";
import "./worker/worker"; 

const app = express();
const PORT = 3000;

const server = http.createServer(app);

initSocket(server);

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/user", user);
app.use("/thread", thread);
app.use("/reply", reply);

server.listen(PORT, () => {
    console.log("server is running on port", PORT);
});