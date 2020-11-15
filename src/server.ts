//import { Server } from '@overnightjs/core';
//import { Logger } from '@overnightjs/logger';
const express = require("express");
import { Express, Request, Response, Router, NextFunction } from 'express';
import requestsRoute from './routes/requests/requests';
import * as dbHandler from './db/dbHandler'
import * as bodyParser from "body-parser";
import cors from 'cors';
import {sendApprovalEmail} from './libs/emailClient'

import { v4 as uuid } from 'uuid';
// import path from "path";

// const buildDir = path.join(process.cwd() + "/src/public/react/request-manager-webapp/src/");

export class Server {
    
  private app: Express;

  constructor(app: Express) {
    this.app = app;

    let router = Router();

    app.use(express.json({
      type: ['application/json', 'text/plain']
    }));
    
    app.use(cors());

    // app.use(
    //   bodyParser.urlencoded({
    //     extended: true,
    //   })
    // );
    // app.use(express.static(buildDir));
    
    // app.get("/*", function (req, res) {
    //   res.sendFile(path.join(buildDir, "index.tsx"));
    // });

    router.param("userid", (req: Request, res: Response, next: NextFunction, id: number) => {
      res.locals.userid = id;
      next();
    });

    router.param("requestid", (req: Request, res: Response, next: NextFunction, id: number) => {
      res.locals.requestid = id;
      next();
    });

    router.route("/requests/:userid")
    .get((req: Request, res: Response, next: NextFunction) => {
      return dbHandler.getRequestsByUserId(res.locals.userid).then(res.json.bind(res)).catch(next);;
    });

    router.route("/approve/:requestid")
    .get((req: Request, res: Response, next: NextFunction) => {
      console.log(res.locals.requestid);
      dbHandler.approveRequest(res.locals.requestid);
      res.status(200).send("The request was successfuly approved!");
    });

    router.post("/requests/", (req: Request, res: Response, next: NextFunction) => {
      var requestType = req.get('Content-Type');
      console.log(req.body);
      console.log(requestType);
      
      // res.status(200).send({"success": true});
      // return;

      // if (requestType !== "application/json") {
      //   res.status(415).end();
      // } else {
        const url: string = req.body.url;
        const approver: string = req.body.approver;
        let userId: string = req.body.userId;
        const reqId: string = req.body.requestId;
                
        if(userId.length === 0) {       
          userId = uuid();
        } 
        dbHandler.saveNewRequest(url, approver, userId, reqId).then((requestId: string) => {
          console.log("request id is" + requestId);
          if (typeof(requestId) !== 'undefined') {
            sendApprovalEmail(requestId, approver);
            res.status(200).send(JSON.stringify({ userId: userId }));
            return;
          }

          res.status(500).send(JSON.stringify({}));
        })
    });
    
    //router.use('/requests', requestsRoute);
    app.use('/', router);
  }

  public start(port: number): void {
    this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
  }
}