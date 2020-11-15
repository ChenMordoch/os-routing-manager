import { Server } from "./server";
import express from "express";
import { RequestsDbHandler } from './db/requestsDbHandler'

const app = express();
const PORT = 8080;

const server = new Server(app);
new RequestsDbHandler().createDb();
server.start(PORT);
