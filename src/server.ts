//import { Server } from '@overnightjs/core';
//import { Logger } from '@overnightjs/logger';
import { Express, Request, Response, Router, NextFunction } from 'express';
import requestsRoute from './routes/requests/requests';
import * as dbHandler from './db/dbHandler'
import * as bodyParser from "body-parser";

export class Server {
    
  private app: Express;

  constructor(app: Express) {
    this.app = app;

    let router = Router();

    app.use('/', router);
  
    router.get('/', (req: Request, res: Response): void  => {
      res.status(200).send("GET / success");
    });

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
      dbHandler.getRequestsByUserId(res.locals.userid).then(res.json.bind(res)).catch(next);;
    });

    router.route("/approve/:requestid")
    .get((req: Request, res: Response, next: NextFunction) => {
      console.log(res.locals.requestid);
      dbHandler.approveRequest(res.locals.requestid);
      res.status(200).send("GET /approve/:requestid success");
    });

    router.post("/requests/", bodyParser.json(), (req: Request, res: Response, next: NextFunction) => {
      var requestType = req.get('Content-Type');
      console.log(requestType);
      console.log(req.body);

      if (requestType !== "application/json") {
        res.status(415).end();
      } else {
        let url: string = req.body.url;
        let approver: string = req.body.approver;        
        dbHandler.saveNewRequest(url, approver, '12345aa');
        res.status(200).send("POST /requests/ success");
      }
      
    });
    
    //router.use('/requests', requestsRoute);
  }

  public start(port: number): void {
    this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
  }
}