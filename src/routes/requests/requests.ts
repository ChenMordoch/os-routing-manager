import { OSRequest } from "src/db/models/request";
import { Router, Request, Response, NextFunction } from "express";
//const bodyParser = require("body-parser");

export default function requestsRoute(): Router {
  
  let router = Router();
  
  // router.param("userid", (req: Request, res: Response, next: NextFunction, id: number) => {
  //   res.locals.userid = id;
  //   // // if (!res.locals.job.isValidId()) {
  //   // //   res.status(400).end("Not valid Id was provided");
  //   // // } else {
  //   // //   next();
  //   // // }
  //   next();
  // });

  // router.route("/:userid")
  // .get(async (req: Request, res: Response) => {
  //   const id: number = parseInt(req.params.id, 10);
  
  //   try {
  
  //     res.status(200).send(id);
  //   } catch (e) {
  //     res.status(404).send(e.message);
  //   }
  // });

  // router.post("/", bodyParser.json(), (request, response) => {
  //   response.send('Post is success!');
  // });
  router.get('/', (request: Request, response: Response): void => {
    response.send('Get is success!');
  });
  
  return router;
}

// ROUTE HANDLERS

const getRequests = (req: Request, res: Response, next: NextFunction): any => {
  console.log("log getRequests");
  
  return res.send(req.params)
  //res.locals.userid.get().then(res.json.bind(res)).catch(next);
};