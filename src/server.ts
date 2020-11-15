import { Express, Request, Response, Router, NextFunction } from 'express';
import cors from 'cors';
import { v4 as uuid } from 'uuid';
import { RequestsDbHandler } from './db/requestsDbHandler';
import { EmailClient } from './libs/emailClient';
const express = require("express");

export class Server {
  private app: Express;
  private dbHandler: RequestsDbHandler

  constructor(app: Express) {
    this.app = app;
    this.dbHandler = new RequestsDbHandler()

    let router = Router();

    app.use(express.json({
      type: ['application/json', 'text/plain']
    }));
    app.use(cors());

    router.route("/requests/:userid")
    .get((req: Request, res: Response, next: NextFunction) => {
      return this.dbHandler.getRequestsByUserId(req.params.userid)
                      .then(res.json.bind(res)).catch(next);
    });

    router.route("/approve/:requestid")
    .get((req: Request, res: Response, next: NextFunction) => {
      this.dbHandler.approveRequest(req.params.requestid);
      res.status(200).send("The request was successfuly approved!");
    });

    router.post("/requests/", (req: Request, res: Response, next: NextFunction) => {
        const url: string = req.body.url;
        const approver: string = req.body.approver;
        let userId: string = req.body.userId;
                
        if(userId.length === 0) {       
          userId = uuid();
        }
        
        this.dbHandler.saveNewRequest(url, approver, userId).then((requestId: string) => {
          new EmailClient().sendApprovalEmail(requestId, url, approver);
          res.status(200).send(JSON.stringify({ userId: userId }));
        })
        .catch(error => {
          res.status(500).send(JSON.stringify(error));
        })
    });
    
    app.use('/', router);
  }

  public start(port: number): void {
    this.app.listen(port, () => 
      console.log(`Server listening on port ${port}!`)
    );
  }
}