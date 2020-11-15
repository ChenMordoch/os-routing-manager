import {Sequelize, DataType} from 'sequelize-typescript';
import {OSRequest} from './models/request'
//const path = require('path');
 
const sequelize =  new Sequelize({
        dialect: 'sqlite',
        storage: __dirname + 'sqlite_db.sqlite',
        models: [OSRequest], 
});

let db = {
  sequelize: sequelize,
};

export default db;

export async function saveNewRequest(osUrl: string, approverEmail: string, userId: string, requestId: string) : Promise<string> {
  let data = {
    osUrl: osUrl, 
    approverEmail: approverEmail,
    approved: false,
    userId: userId,
    requestId: requestId,
  }
  
  return await OSRequest.create(data).then((request: OSRequest) => {
    return new Promise<string>(resolve => resolve(request.requestId))
  }).catch((error: Error) => {
    return new Promise<string>(resolve => resolve(undefined))
  })
}

export function getRequestsByUserId(userId: string) {
  return OSRequest.findAll({ where: { userId: userId } }).then((requests: OSRequest[]) => {
    return requests;
  }).catch((err: Error) => {
    throw new Error("Couldn't find requests: " + err);
  });
}

export function approveRequest(requestId: string) : void {
  OSRequest.update({ approved: true }, {
    where: {
      requestId: requestId
    }
  }).then((result: [number, OSRequest[]]) => {
    return result[0];
  }).catch((err) => {
    throw new Error("Couldn't update request approval: " + err);
  });
}

 
