import { Server } from "./server";
import express from "express";

const app = express();
const PORT = 8080;

const server = new Server(app);
server.start(PORT);
