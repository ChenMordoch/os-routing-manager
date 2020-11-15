import { Server } from "./server";
import db, {approveRequest, getRequestsByUserId, saveNewRequest} from "./db/dbHandler";

import express from "express";
const app = express();

const port = 8080;

const server = new Server(app);
server.start(port);
db.sequelize.sync({ force: true }).then(function() {
  console.log("DB initialized!");
});